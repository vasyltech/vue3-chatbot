<template>
  <div :id="message.id" :class="{
    'cb-message': true,
    'cb-has-feedback': $settings.captureFeedback && message.capture_feedback
  }">
    <div
      class="cb-message--content"
      :class="{
        sent: message.role === 'user',
        received: message.role !== 'user' && message.type !== 'system',
        system: message.type === 'system'
      }"
    >
      <TypingMessage v-if="message.type === 'typing'" />
      <TextMessage v-else :message="message" />
    </div>

    <div v-if="$settings.captureFeedback && message.capture_feedback" class="cb-message-feedback">
      <span>Was it helpful?</span>

      <img
        :src="$theme.message.icons.thumbUpImg"
        :alt="$i18n.message.icons.thumbUpAlt"
        class="cb-feedback-action thumb-up"
        :class="{ selected: message.feedback === 'y' }"
        @click="captureFeedback(true, message)"
      />
      <img
        :src="$theme.message.icons.thumbDownImg"
        :alt="$i18n.message.icons.thumbDownAlt"
        class="cb-feedback-action thumb-down"
        :class="{ selected: message.feedback === 'n' }"
        @click="captureFeedback(false, message)"
      />
    </div>
  </div>
</template>

<script>
import TextMessage from './messages/TextMessage.vue'
import TypingMessage from './messages/TypingMessage.vue'

export default {
  components: {
    TextMessage,
    TypingMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    captureFeedback(feedback, message) {
      message.feedback = feedback ? 'y' : 'n';

      const payload = {
        id: this.$conversation.id,
        message
      }

      this.$api.updateConversation(payload);
    }
  }
}
</script>