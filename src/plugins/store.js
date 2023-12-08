import { createPinia, defineStore } from 'pinia';
import { GenerateUUID } from '@/libs/utilities';

const pinia       = createPinia();
const useAppStore = defineStore('app', {
    state: () => {
        const stored     = localStorage.getItem('tldr-cb');
        let conversation = {};

        if (stored) {
            conversation = JSON.parse(stored).conversation;
        }

        if (conversation.origin !== location.origin) {
            conversation = {
                id: GenerateUUID(),
                origin: location.origin,
                messages: []
            }
        }

        return {
            hasNewMessage: false,
            typing: false,
            conversation
        }
    }
});

pinia.use(({ store }) => {
    store.$subscribe(() => {
        localStorage.setItem('tldr-cb', JSON.stringify({
            conversation: store.$state.conversation
        }));
    })
});

export default {

    /**
     *
     * @param {*} app
     * @param {*} options
     */
    install(app) {
        app.use(pinia);
        app.config.globalProperties.$store = useAppStore();
    }

}