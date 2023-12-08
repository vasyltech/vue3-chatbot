import { createApp } from 'vue';
import App from './App.vue';

import Theme from './plugins/theme';
import Settings from './plugins/settings';
import Localization from './plugins/i18n';
import Api from './plugins/api';
import Store from './plugins/store';

// Get all the default theme icons
import OpenImg from './assets/open-icon.svg?inline';
import CloseImg from './assets/close-icon.svg?inline';
import ThumbUpImg from './assets/thumb-up.svg?inline';
import ThumbDownImg from './assets/thumb-down.svg?inline';
import SendImg from './assets/send-icon.svg?inline';
import RestartImg from './assets/restart-icon.svg?inline';

const id  = `cb-${(Math.random() + 1).toString(36).substring(7)}`;
const app = createApp(App);

// Creating container and adding the shadow DOM mode
const container = document.createElement('div');
container.id    = id;
container.style = 'z-index: 99999; position: fixed';

document.body.append(container);

const shadow = container.attachShadow({ mode: 'open' });

// **************
// Below we are installing various plugins. Order matters!
// **************

// Central state
app.use(Store);

// Text localization settings
app.use(Localization, {
    lang: 'en',
    en: {
        name: 'Chatbot',
        launcher: {
            icons: {
                openAlt: 'Open Chatbot',
                closeAlt: 'Close Chatbot'
            }
        },
        header: {
            prompt: 'Chat with',
            icons: {
                logoAlt: 'Friendly AI Chatbot',
                closeAlt: 'Close Chatbot'
            }
        },
        message: {
            icons: {
                thumbUpAlt: 'Yes! It was helpful',
                thumbDownAlt: 'No! It was not helpful'
            }

        },
        input: {
            placeholder: 'Write something...',
            icons: {
                sendAlt: 'Send Message',
                restartAlt: 'Restart Conversation'
            },
            tooltip: {
                sendBtn: 'Send Message',
                restartBtn: 'Restart Conversation'
            }
        },
        conversation: {
            greeting: 'Howdy, there! How can I help you today?',
            unexpectedFailure: 'Sorry, but I was having some troubles processing your message',
            delayInResponse: 'Sorry for the delay. Give me few more seconds...'
        }
    }
});

// Theme settings
app.use(Theme, {
    id,
    container: shadow,
    skin: {
        launcher: {
            bgColor: '#000000',
            icons: {
                openImg: OpenImg,
                closeImg: CloseImg
            }
        },
        window: {
            size: 'large'
        },
        notification: {
            bgColor: '#ff4646'
        },
        header: {
            bgColor: '#000000',
            txtColor: '#FFFFFF',
            icons: {
                logoImg: OpenImg,
                closeImg: CloseImg
            }
        },
        messageList: {
            bgColor: '#FFFFFF'
        },
        message: {
            sent: {
                bgColor: '#DFDCFF',
                txtColor: '#000000'
            },
            received: {
                bgColor: '#F0F0F0',
                txtColor: '#000000'
            },
            icons: {
                thumbUpImg: ThumbUpImg,
                thumbDownImg: ThumbDownImg
            }
        },
        input: {
            bgColor:'#222222',
            txtColor: '#FFFFFF',
            icons: {
                sendImg: SendImg,
                restartImg: RestartImg
            }
        },
        tooltip: {
            bgColor:'#000000',
            txtColor: '#FFFFFF'
        }
    }
});

// API settings
app.use(Api, {
    startConversation: (data, cb) => {
        setTimeout(function() {
            cb({
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt, mauris vel eleifend hendrerit, diam ante gravida ex, et gravida velit est ut mauris. Donec tempor at libero et volutpat.',
                type: 'answer'
            });
        }, 3000);
    },
    continueConversation: (data, cb) => {
        setTimeout(function() {
            cb({
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt, mauris vel eleifend hendrerit, diam ante gravida ex, et gravida velit est ut mauris. Donec tempor at libero et volutpat.',
                type: 'answer'
            });
        }, 3000);
    },
    updateConversation: (data, cb = null) => {
        setTimeout(function() {
            console.log('conversation updated');
        }, 3000);
    },
    prepareContext() {
        const context = {
            origin: () => location.origin,
            title: () => {
                const title = document.head.getElementsByTagName('title');

                return title.length ? title[0].innerText : undefined;
            },
            description: () => {
                const meta = document.head.querySelectorAll(
                    'meta[name="description"]'
                );

                return meta.length ? meta[0].getAttribute('content') : undefined;
            },
            content: () => {
                const content = document.getElementsByTagName('article');

                return content.length ? content[0].innerHTML : undefined;
            },
            schema: () => {
                const schema = document.head.querySelectorAll(
                    'script[type="application/ld+json"]'
                );

                return schema.length ? schema[0].innerText : undefined;
            }
        };

        // Generating the conversation context
        const response = {};

        for(let i in context) {
            if (typeof context[i] === 'function') {
                response[i] = context[i]();
            } else {
                const el    = document.head.querySelectorAll(context[i]);
                response[i] = el.length ? el[0].innerText : undefined;
            }
        }

        return response;
    }
});

// Application settings
app.use(Settings, {
    thresholds: {
        8: {
            action: 'showTyping'
        },
        13: {
            action: 'hideTyping'
        },
        15: {
            action: 'showWaiting',
            message: '$i18n.conversation.delayInResponse'
        },
        22: {
            action: 'halt',
            message: '$i18n.conversation.unexpectedFailure'
        }
    },
    captureFeedback: true,
    hideLauncher: false
});

app.mount(shadow);