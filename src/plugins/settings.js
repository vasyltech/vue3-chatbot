import { DeepOverride, GenerateUUID, GetCustomConfigNs } from '@/libs/utilities';

export default {

    /**
     *
     * @param {*} app
     * @param {*} options
     */
    install(app, options = {}) {
        // Checking if we have global settings defined
        const scope = app.config.globalProperties;

        // Set the application settings to be available through entire app
        scope.$settings = DeepOverride(options, GetCustomConfigNs('app'));;

        // Initializing the conversation data
        const conversation = scope.$store.conversation;
        const initial      = {
            id: GenerateUUID(),
            role: 'assistant',
            content: scope.$i18n.conversation.greeting,
            type: 'text'
        };

        // Is this a new conversation? If so, show a greeting message
        if (conversation.messages.length === 0) {
            conversation.messages = [initial];
        }

        scope.$conversation = {
            addMessage(content, role = 'user', type = 'text') {
                let message;

                if (typeof content === 'object') {
                    message = Object.assign({
                        id: GenerateUUID(),
                        role,
                        type
                    }, content);
                } else {
                    message = {
                        id: GenerateUUID(),
                        role,
                        type,
                        content
                    }
                }

                conversation.messages.push(message);
            },
            reset() {
                conversation.id       = GenerateUUID();
                conversation.messages = [initial];
            },
            get messages() {
                return conversation.messages;
            },
            get id() {
                return conversation.id;
            }
        };
    }

}