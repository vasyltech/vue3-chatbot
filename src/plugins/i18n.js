import { DeepOverride, GetCustomConfigNs } from '@/libs/utilities';

export default {

    /**
     *
     * @param {*} app
     * @param {*} options
     */
    install(app, options = {}) {
        // Checking if we have global settings defined
        const scope    = app.config.globalProperties;
        const settings = DeepOverride(options, GetCustomConfigNs('i18n'));

        // Set the application localization to be available through entire app
        scope.$i18n = settings[settings.lang] || settings.en;

        // Also declare the dynamic getter
        scope.$i18n._ = (str) => {
            let response = str;

            if (str.indexOf('$i18n.') === 0) {
                const xpath = str.split('.').slice(1);
                let target  = scope.$i18n;

                for(let i of xpath) {
                    target = typeof target[i] !== 'undefined' ? target[i] : null;

                    if (target === null) {
                        break;
                    }
                }

                response = target || '';
            }

            return response;
        }
    }

}