<template>
  <div ref="messageList" class="cb-message-list">
    <Message v-for="message in $conversation.messages" :key="message" :message="message" />
    <Message v-if="$store.typing" :message="{ type: 'typing' }"/>
  </div>
</template>

<script>
import Message from './Message.vue';

export default {
  components: {
    Message
  },
  data() {
    return {
      windowResizer: null
    }
  },
  mounted() {
    this.initWindowResizer();
    this.$nextTick(this.scrollToBottom())
  },
  beforeUnmount() {
    this.windowResizer.unobserve(this.$refs.messageList);
  },
  updated() {
    this.$nextTick(this.scrollToBottom());
  },
  methods: {
    scrollToBottom() {
      this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
    },
    initWindowResizer() {
      this.windowResizer = new ResizeObserver(() => {
        this.scrollToBottom();
      });

      this.windowResizer.observe(this.$refs.messageList);
    }
  }
}
</script>