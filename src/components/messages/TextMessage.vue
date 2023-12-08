<template>
  <div class="cb-message--text">
    <slot
      :message="message"
    >
      <p class="cb-message--text-content" v-html="message.content"></p>
    </slot>
  </div>
</template>

<script>

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>