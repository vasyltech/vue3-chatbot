<template>
  <div class="cb-user-input" :class="{ active: inputActive }">
    <div
      ref="userInput"
      role="button"
      tabIndex="0"
      contentEditable="true"
      :placeholder="$i18n.input.placeholder"
      class="cb-user-input--text"
      @focus="setInputActive(true)"
      @blur="setInputActive(false)"
      @keydown="handleKey"
    ></div>

    <div class="cb-user-input--buttons">
      <div class="cb-user-input--button">
        <div class="tooltip">
          <img
            :src="$theme.input.icons.sendImg"
            :alt="$i18n.input.icons.sendAlt"
            @click.native.prevent="_submitText"
          />
          <span class="tooltiptext">{{ $i18n.input.tooltip.sendBtn }}</span>
        </div>
      </div>
      <div class="cb-user-input--button">
        <div class="tooltip">
          <img
            :src="$theme.input.icons.restartImg"
            :alt="$theme.input.icons.restartAlt"
            @click.native.prevent="restart"
          />
          <span class="tooltiptext">{{ $i18n.input.tooltip.restartBtn }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      inputActive: false
    }
  },
  methods: {
    setInputActive(onoff) {
      this.inputActive = onoff
    },
    handleKey(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        this._submitText(event);

        event.preventDefault();
      }
    },
    _submitText() {
      //const text = this.$refs.userInput.innerHTML
      const text = this.$refs.userInput.textContent;

      if (text && text.length > 0) {
        this.$emit('submit', text);

        this.$refs.userInput.innerHTML = '';
      }
    },
    restart() {
      this.$conversation.reset();
    }
  }
}
</script>