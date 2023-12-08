import { DeepOverride, GetCustomConfigNs } from '@/libs/utilities';

/**
 *
 */
class BaseTheme {

    /**
     * Styles
     *
     * @var {String}
     */
    _style = `
    .cb-launcher {
        width: 60px;
        height: 60px;
        background-position: center;
        background-repeat: no-repeat;
        position: fixed;
        right: 25px;
        bottom: 25px;
        border-radius: 50%;
        background-color: var(--launcher-bg-color);
        box-shadow: none;
        transition: box-shadow 0.2s ease-in-out;
        cursor: pointer;

        &:before {
            content: '';
            position: relative;
            display: block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            transition: box-shadow 0.2s ease-in-out;
        }

        .cb-open-icon,
        .cb-closed-icon {
            width: 60px;
            height: 60px;
            position: fixed;
            right: 25px;
            bottom: 25px;
            transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
        }

        .cb-closed-icon {
            transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
            width: 60px;
            height: 60px;
        }

        .cb-open-icon {
            padding: 10px;
            box-sizing: border-box;
            opacity: 1;
        }

        &.opened .cb-open-icon {
            transform: rotate(-90deg);
            opacity: 1;
        }

        &.opened .cb-closed-icon {
            transform: rotate(-90deg);
            opacity: 1;
            padding: 20px;
            box-sizing: border-box;
        }

        &.opened:before {
            box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
        }

        &:hover {
            box-shadow: 0 0px 27px 1.5px rgba(0, 0, 0, 0.2);
        }

        .cb-notification {
            position: absolute;
            top: -3px;
            left: 41px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            background: #ff4646;
            margin: auto;
        }

        &.hidden {
            display: none;
        }
    }

    .cb-chat-window {
        height: calc(100% - 120px);
        max-height: 590px;
        position: fixed;
        right: 25px;
        bottom: 100px;
        box-sizing: border-box;
        box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        animation: fadeIn;
        animation-duration: 0.3s;
        animation-timing-function: ease-in-out;

        &.compact {
            width: 370px;
        }

        &.large {
            width: 550px;
        }

        &.closed {
            opacity: 0;
            display: none;
            bottom: 90px;
        }
    }

    @keyframes fadeIn {
        0% {
            display: none;
            opacity: 0;
        }

        100% {
            display: flex;
            opacity: 1;
        }
    }

    @keyframes bob {
        10% {
            transform: translateY(-10px);
            background-color: #9e9da2;
        }

        50% {
            transform: translateY(0);
            background-color: #b6b5ba;
        }
    }

    @media (max-width: 450px) {
        .cb-chat-window {
            width: 100%;
            height: 100%;
            max-height: 100%;
            right: 0px;
            bottom: 0px;
            border-radius: 0px;
            transition: 0.1s ease-in-out;

            &.large, &.compact {
                width: 100%;
            }

            &.closed {
                bottom: 0px;
            }
        }
    }

    .cb-header {
        min-height: 75px;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
        padding: 10px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        position: relative;
        box-sizing: border-box;
        display: flex;
        background-color: var(--header-bg-color);
        color: var(--header-txt-color);

        .cb-header--img {
            align-self: center;
            padding: 10px;
            max-width: 50px;
        }

        .cb-header--title {
            align-self: center;
            padding: 10px;
            flex: 1;
            user-select: none;
            font-size: 20px;
        }

        .cb-header--title.enabled {
            cursor: pointer;
            border-radius: 5px;
        }

        .cb-header--title.enabled:hover {
            box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
        }

        .cb-header--close-button {
            width: 40px;
            align-self: center;
            height: 40px;
            margin-right: 10px;
            box-sizing: border-box;
            cursor: pointer;
            border-radius: 5px;
            margin-left: auto;
        }

        .cb-header--close-button:hover {
            box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
        }

        .cb-header--close-button img {
            width: 100%;
            height: 100%;
            padding: 13px;
            box-sizing: border-box;
        }
    }

    @media (max-width: 450px) {
        .cb-header {
            border-radius: 0px;
        }
    }

    .cb-message-list {
        height: 80%;
        overflow-y: auto;
        background-size: 100%;
        padding: 40px 0px;
        scroll-behavior: smooth;
        background-color: var(--message-list-bg-color)
    }

    .cb-message {
        width: 85%;
        margin: auto;
        font-size: 1rem;
        line-height: 1.25rem;
        position: relative;
        padding-bottom: 10px;
        display: flex;

        .cb-message--content {
            width: 100%;
            display: flex;

            &.sent {
                justify-content: flex-end;

                .cb-message--text {
                    margin-left: 40px;
                    background-color: var(--message-sent-bg-color);
                    color: var(--message-sent-txt-color);
                }
            }

            &.received {
                .cb-message--text, .cb-message--typing {
                    margin-right: 40px;
                    background-color: var(--message-received-bg-color);
                    color: var(--message-received-txt-color);
                }
            }

            .cb-message--text {
                padding: 5px 20px;
                border-radius: 6px;
                font-weight: 300;
                position: relative;
                -webkit-font-smoothing: subpixel-antialiased;

                .cb-message--text-content {
                    white-space: wrap;

                    code {
                        font-family: 'Courier New', Courier, monospace !important;
                    }
                }
            }

            .cb-message--typing {
                text-align: center;
                padding: 17px 20px;
                border-radius: 6px;

                & span {
                    display: inline-block;
                    background-color: #b6b5ba;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                    margin-right: 3px;
                    animation: bob 2s infinite;
                }

                & span:nth-child(1) {
                    animation-delay: -1s;
                }

                & span:nth-child(2) {
                    animation-delay: -0.85s;
                }

                & span:nth-child(3) {
                    animation-delay: -0.7s;
                }
            }
        }

        &.cb-has-feedback {
            padding-bottom: 30px;
        }

        .cb-message-feedback {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 4px 0 4px 10px;
            background-color: #F4F7E5;
            border-radius: 6px;
            bottom: 10px;
            width: 150px;
            right: 50px;

            & span {
                font-size: 0.7rem;
                font-weight: 300;
            }

            & img {
                display: inline;
                max-width: 22px;
            }

            .cb-feedback-action {
                cursor: pointer;
            }

            .cb-feedback-action.selected {
                max-width: 28px !important;
            }
        }
    }

    @media (max-width: 450px) {
        .cb-message {
            width: 80%;
        }
    }

    .cb-user-input {
        min-height: 55px;
        margin: 0px;
        position: relative;
        bottom: 0;
        display: flex;
        background-color: var(--input-bg-color);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        transition: background-color 0.2s ease, box-shadow 0.2s ease;

        &.active {
            box-shadow: none;
            box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
        }

        .cb-user-input--text {
            width: calc(100% - 80px);
            resize: none;
            border: none;
            outline: none;
            border-bottom-left-radius: 10px;
            box-sizing: border-box;
            padding: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.33;
            white-space: pre-wrap;
            word-wrap: break-word;
            color: #565867;
            -webkit-font-smoothing: antialiased;
            max-height: 200px;
            overflow: scroll;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: auto;
            color: var(--input-txt-color);

            &:empty:before {
                content: attr(placeholder);
                display: block;
                filter: contrast(15%);
                outline: none;
                cursor: text;
            }
        }

        .cb-user-input--buttons {
            width: 80px;
            position: absolute;
            right: 30px;
            height: 100%;
            display: flex;
            gap: 10px;
            justify-content: flex-end;

            .cb-user-input--button {
                width: 30px;
                height: 100%;
                margin-left: 2px;
                margin-right: 2px;
                display: flex;
                cursor: pointer;
                flex-direction: column;
                justify-content: center;

                & img {
                    max-width: 22px;
                }
            }

            .tooltip {
                position: relative;
                display: inline-block;
            }

            .tooltip .tooltiptext {
                visibility: hidden;
                width: 120px;
                bottom: 100%;
                left: 50%;
                margin-left: -60px;
                margin-bottom: 10px;
                background-color: var(--tooltip-bg-color);
                color: var(--tooltip-txt-color);
                text-align: center;
                padding: 5px 0;
                border-radius: 6px;
                font-size: 0.8rem;

                position: absolute;
                z-index: 1;
            }

            .tooltip:hover .tooltiptext {
                visibility: visible;
            }

            .tooltip .tooltiptext::after {
                content: " ";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: var(--tooltip-bg-color) transparent transparent transparent;
            }
        }
    }`;

    /**
     * Render the stylesheet
     *
     * TODO: For yet unknown reason the "adoptedStyleSheets" does not accept CSS
     * variables. That is why taking this not ideal solution
     *
     * @param {Object} theme
     *
     * @returns {String}
     */
    render(theme) {
        return (theme.style || this._style)
            .replaceAll('var(--launcher-bg-color)', theme.launcher.bgColor)
            .replaceAll('var(--header-bg-color)', theme.header.bgColor)
            .replaceAll('var(--header-txt-color)', theme.header.txtColor)
            .replaceAll('var(--message-list-bg-color)', theme.messageList.bgColor)
            .replaceAll('var(--message-sent-bg-color)', theme.message.sent.bgColor)
            .replaceAll('var(--message-sent-txt-color)', theme.message.sent.txtColor)
            .replaceAll('var(--message-received-bg-color)', theme.message.received.bgColor)
            .replaceAll('var(--message-received-txt-color)', theme.message.received.txtColor)
            .replaceAll('var(--input-bg-color)', theme.input.bgColor)
            .replaceAll('var(--input-txt-color)', theme.input.txtColor)
            .replaceAll('var(--tooltip-bg-color)', theme.tooltip.bgColor)
            .replaceAll('var(--tooltip-txt-color)', theme.tooltip.txtColor)
    }
}

export default {

    /**
     * Install the theme plugin
     *
     * @param {*} app
     * @param {*} options Theme Options
     *
     * @return {void}
     */
    install(app, options) {
        // Checking if we have global settings defined
        const scope    = app.config.globalProperties;
        const settings = DeepOverride(options, GetCustomConfigNs('theme'));

        // Pass theme skin settings to the app
        scope.$theme = settings.skin;

        const theme = new BaseTheme;
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(theme.render(settings.skin));

        options.container.adoptedStyleSheets = [sheet];
    }

}