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

        // Set the application API to be available through entire app
        scope.$api = DeepOverride(options, GetCustomConfigNs('api'));
    }

}