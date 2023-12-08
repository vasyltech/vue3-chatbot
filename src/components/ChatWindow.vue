<template>
  <div
    class="cb-chat-window"
    :class="{opened: isOpen, closed: !isOpen, [$theme.window.size]: true }"
  >
    <Header @close="$emit('close')" />
    <MessageList />
    <UserInput @submit="submitUserMessage($event)" />
  </div>
</template>

<script>
  import Header from './Header.vue';
  import MessageList from './MessageList.vue';
  import UserInput from './UserInput.vue';

  export default {
    components: {
      Header,
      MessageList,
      UserInput
    },
    props: {
      isOpen: {
        type: Boolean,
        default: () => false
      }
    },
    data: function() {
      return {
        postInterval: null,
        thresholds: 0
      }
    },
    methods: {
      submitUserMessage(content) {
        const _this = this;

        this.$conversation.addMessage(content);

        if (!this.isOpen) {
          this.$store.hasNewMessage = true;
        }

        this.thresholds   = 0;
        this.postInterval = setInterval(function() {
          _this.thresholds++;

          const step = _this.$settings.thresholds[_this.thresholds];

          if (step) {
            if (step.action === 'showTyping') {
              _this.$store.typing = true;
            } else if (step.action === 'hideTyping') {
              _this.$store.typing = false;
            } else if (step.action === 'halt') {
              _this.postInterval = clearInterval(_this.postInterval);
              _this.$conversation.addMessage(_this.i18n._(step.message), 'assistant');
            } else if (step.action === 'showWaiting') {
              _this.$conversation.addMessage(_this.i18n._(step.message), 'assistant');
            }
          }
        }, 1000);

        // Determining if this is the beginning of the conversation or continuation
        const c = this.$conversation.messages.filter(m => m.role === 'user').length;

        const cb = function (response) {
          _this.postInterval  = clearInterval(_this.postInterval);
          _this.$store.typing = false;

          if (response !== null) {
            _this.$conversation.addMessage({
              id: response.id,
              role: 'assistant',
              content: response.answer,
              capture_feedback: response.type === 'answer'
            });
          } else {
            _this.$conversation.addMessage(
              _this.$i18n.unexpectedFailure, 'assistant'
            );
          }
        };

        const payload = {
          id: this.$conversation.id
        }

        if (c === 1) { // Starting new conversation
          payload.messages = this.$conversation.messages
          payload.context  = this.$api.prepareContext();

          this.$api.startConversation(payload, cb);
        } else { // Continuing
          payload.message = content;

          this.$api.continueConversation(payload, cb);
        }
      }
    }
  }
</script>