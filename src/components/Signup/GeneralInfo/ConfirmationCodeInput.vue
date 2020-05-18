<script>
export default {
  name: 'ConfirmationCodeInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    index: {
      required: true,
      type: Number,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value || '',
    }
  },
  watch: {
    value(newVal) {
      this.innerValue = this.parseValue(newVal)
    },
    innerValue(newVal, oldVal) {
      if (newVal.length > 0) {
        this.$emit('move', this.index + 1)
      }
      this.$emit('input', newVal)
    },
  },
  methods: {
    parseValue(newVal) {
      return newVal.replace(/\D/g, '')
    },
    onInput(evt) {
      if (evt.target.value.length > 1) {
        evt.target.value = this.innerValue
        this.$emit('move', this.index + 1)
      }
      const result = this.parseValue(evt.target.value)
      this.innerValue = result
      evt.target.value = result
    },
    focus() {
      // Called by ConfirmationCodeForm.vue
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    onKeyDown(e) {
      if (e.keyCode === 8) {
        if (this.innerValue.length === 0) {
          e.preventDefault()
          this.$emit('move', this.index - 1)
        }
      }
    },
  },
}
</script>
<template>
  <input
    ref="input"
    type="tel"
    :class="{
      'text-black de:text-black de:boder-gray-700': !error,
      'text-alert de:border-alert': error,
    }"
    style="width:55px"
    class="h-16 min-w-0 py-2 text-4xl font-bold text-center placeholder-transparent bg-white rounded-lg focus:outline-none de:bg-white de:border de:hover:bg-gray-100"
    :placeholder="`codeInput${index}`"
    :value="innerValue"
    :disabled="disabled"
    @keydown="onKeyDown"
    @focus="$refs.input.select()"
    @input="onInput"
  />
</template>
<style lang="scss" scoped>
.gxCaret {
  caret-color: var(--primary-600);
}
</style>
