<script>
import { createInputService } from '@components/_Core/globals/V2/Forms/GxTextFieldDarkStateMachine'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'
import inputValidators from '@src/utils/input-validators.js'
export default {
  name: 'GxTextFieldInternationalPhone',
  components: {
    GxIcon2,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    assistive: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
      default: '',
    },
    rightIcon: {
      type: String,
      default: '',
    },
    rightIconClickHandler: {
      type: Function,
      default: null,
    },
    inputClasses: {
      type: Object,
      default: () => ({}),
    },
    labelClasses: {
      type: Object,
      default: () => ({}),
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    autocorrect: {
      type: String,
      default: 'off',
    },
    displayAssistiveText: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // innerValue: this.value,
      currentState: null,
      inputService: null,
      assistiveStyle: '',
      validationFn: inputValidators['phone'],
    }
  },
  computed: {
    emptyAndRequired() {
      if (this.inputService) {
        return (
          this.inputService.state.matches('focused.emptyAndRequired') ||
          this.inputService.state.matches('blurred.emptyAndRequired')
        )
      }
      return false
    },
    validationError() {
      if (this.inputService) {
        return (
          this.inputService.state.context.errorMsg &&
          (this.inputService.state.matches('focused.error') ||
            this.inputService.state.matches('blurred.error'))
        )
      }
      return false
    },
    assistiveText() {
      if (this.emptyAndRequired) {
        return 'Este campo es requerido'
      }
      if (this.validationError) {
        return this.inputService.state.context.errorMsg
      }
      if (this.assistive) {
        return this.assistive
      }
      return null
    },
    // used to set a min-height when passing assistive as empty string
    innerValidationFn() {
      if (this.validationFn) return this.validationFn

      return null
    },
    isIOS() {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    },
    innerRightIconClickHandler() {
      if (this.rightIconClickHandler) return this.rightIconClickHandler

      return () => {}
    },
  },
  watch: {
    assistiveText(newVal) {
      this.$emit('assistive', newVal)
    },
    assistive() {
      this.setAssistiveStyle()
    },
    value(newVal) {
      this.inputService.send('TYPING', { value: newVal })
    },
    error(newError) {
      if (newError) {
        this.inputService.send('ERROR', { errorMsg: newError })
      }
    },
    // Watcher for debugging purposes only
    currentState(newVal) {
      /* eslint-disable */
      // console.log('Current state: ', JSON.stringify(newVal.value))
      // console.log('Current context: ', JSON.stringify(newVal.context))
      /* eslint-enable */
    },
  },
  created() {
    this.inputService = createInputService({
      value: '',
      required: this.required,
      validationFn: this.innerValidationFn,
    })
    this.inputService.onTransition((state) => {
      /* eslint-disable */
      // console.log('Transitioning to ', state)
      /* eslint-enable */
      this.currentState = state
    })

    // If a value exists on creation, immediately send a TYPING event with the value
    // for validation
    // We can't do this from the watcher for value, since we need the input service to be available
    if (this.value) {
      this.inputService.send('TYPING', { value: this.value })
    }
  },
  mounted() {
    this.setAssistiveStyle()
    if (this.autofocus && !this.isIOS) {
      this.timeoutSetFocus()
    }
  },
  methods: {
    updateValue(event) {
      // Remove invalid characters
      let parsedValue = event.target.value.replace(
        /[A-Za-z`~!#$%^&*¬|×÷£¡₩¥€=¨Ç¿?;:'“‘,‘•",·<>[\]\\/]/gi,
        ''
      )
      const nonNumericCharsCount = parsedValue.match(/\D/gi)
        ? parsedValue.match(/\D/gi).length
        : 0

      this.phoneMaxLength = 15 + nonNumericCharsCount

      if (this.phoneMaxLength < parsedValue.length) {
        parsedValue = parsedValue.slice(0, this.phoneMaxLength)
      }

      event.target.value = parsedValue
      this.$emit('input', parsedValue)
    },
    setFocus() {
      this.$refs.gxInput.focus()
    },
    timeoutSetFocus() {
      setTimeout(() => {
        this.setFocus()
      }, 300)
    },
    setAssistiveStyle() {
      if (this.assistive && this.$refs && this.$refs.assistive) {
        const minHeight = window
          .getComputedStyle(this.$refs.assistive, null)
          .getPropertyValue('line-height')
        this.assistiveStyle = `min-height: ${minHeight}`
      }
    },
    isValid() {
      this.inputService.send('TYPING', {
        value: this.inputService.state.context.value,
      })

      return (
        !this.inputService.state.context.errorMsg &&
        !this.inputService.state.matches('blurred.emptyAndRequired')
      )
    },
    onFocus() {
      this.inputService.send('FOCUS')
      this.$emit('focus')
    },
    onBlur() {
      this.inputService.send('BLUR')
      this.$emit('blur')
    },
  },
}
</script>
<template>
  <div class="w-full">
    <div class="relative flex flex-col justify-end">
      <GxIcon2
        v-if="leftIcon"
        :icon="leftIcon"
        class="absolute bottom-0 left-0 pl-4 text-lg de:text-xs gxIcon"
        :class="{
          'cursor-not-allowed text-secondary-100': disabled,
          'text-white':
            !disabled &&
            (inputService.state.matches('blurred.valid') ||
              inputService.state.matches('blurred.empty') ||
              inputService.state.matches('blurred.inactive')),
          'text-primary':
            !disabled &&
            (inputService.state.matches('focused.typing') ||
              inputService.state.matches('focused.active') ||
              inputService.state.matches('focused.valid') ||
              inputService.state.matches('focused.validAndRequired') ||
              inputService.state.matches('blurred.validAndRequired')),
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.error') ||
              inputService.state.matches('focused.emptyAndRequired') ||
              inputService.state.matches('blurred.emptyAndRequired') ||
              inputService.state.matches('blurred.error')),
        }"
      />
      <label
        :for="_uid"
        class="absolute bottom-0 pb-3 pl-4 text-lg leading-normal cursor-text de:text-xs gxLabel"
        :class="{
          ...labelClasses,
          hidden:
            inputService.state.matches('focused') ||
            inputService.state.matches('blurred.valid') ||
            inputService.state.matches('blurred.error') ||
            inputService.state.matches('blurred.validAndRequired'),
          'cursor-not-allowed': disabled,
          'text-secondary-100': disabled,
          'text-black':
            !disabled &&
            (inputService.state.matches('blurred.inactive') ||
              inputService.state.matches('blurred.empty')),
          'text-alert':
            !disabled &&
            (inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          gxIconPaddingLeftLarge: leftIcon,
          'pr-11': rightIcon,
        }"
      >
        {{ label }}
      </label>
      <!-- Need leading-normal to account for accents in uppercase letters -->
      <input
        :id="_uid"
        ref="gxInput"
        :value="value"
        type="tel"
        :autocomplete="autocomplete"
        :name="_uid"
        :disabled="disabled"
        class="w-full text-lg leading-normal rounded-lg shadow de:text-xs pr-9 focus:outline-none gxInput"
        :class="{
          ...inputClasses,
          gxCaretPrimary: inputService.state.matches('focused'),
          gxCaretAlert:
            inputService.state.matches('focused.error') ||
            inputService.state.matches('focused.emptyAndRequired'),
          'cursor-not-allowed bg-primary-550': disabled,
          'text-secondary-100': disabled,
          'bg-white': !disabled,
          'hover:bg-white': !disabled && inputService.state.matches('blurred'),
          'pl-4': !leftIcon,
          gxIconPaddingLeftLarge: leftIcon,
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          'text-black':
            !disabled &&
            ((inputService.state.matches('focused') &&
              !inputService.state.matches('focused.error')) ||
              inputService.state.matches('blurred.valid') ||
              inputService.state.matches('blurred.validAndRequired')),
        }"
        @input="updateValue"
        @focus="onFocus"
        @blur="onBlur"
      />
      <GxIcon2
        v-if="rightIcon"
        :icon="rightIcon"
        class="absolute bottom-0 right-0 pr-4 text-lg gxIcon de:text-xs"
        :class="{
          'cursor-pointer': innerRightIconClickHandler,
          'text-black':
            !disabled &&
            !(
              inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired') ||
              inputService.state.matches('focused.validAndRequired') ||
              inputService.state.matches('blurred.validAndRequired') ||
              inputService.state.matches('focused.valid') ||
              inputService.state.matches('blurred.valid')
            ),
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          'text-white':
            (!disabled &&
              (inputService.state.matches('focused.valid') ||
                inputService.state.matches('blurred.valid'))) ||
            inputService.state.matches('focused.validAndRequired') ||
            inputService.state.matches('blurred.validAndRequired'),
        }"
        @click="innerRightIconClickHandler"
      />
      <GxIcon2
        v-else-if="
          inputService.state.matches('focused.emptyAndRequired') ||
            inputService.state.matches('blurred.emptyAndRequired')
        "
        icon="cancel"
        class="absolute bottom-0 right-0 pr-4 text-lg text-alert gxIcon de:text-xs"
      />
      <GxIcon2
        v-else-if="
          inputService.state.matches('focused.validAndRequired') ||
            inputService.state.matches('blurred.validAndRequired')
        "
        icon="check_circle"
        class="absolute bottom-0 right-0 pr-4 text-lg text-primary gxIcon de:text-xs"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gxCaretPrimary {
  caret-color: var(--primary);
}
.gxCaretAlert {
  caret-color: var(--alert);
}
.gxLabel {
  padding-bottom: 11px;
}
.gxInput {
  padding-top: 12px;
  padding-bottom: 11px;
}
.gxIcon {
  padding-bottom: 16px;
}
.gxIconPaddingLeftLarge {
  padding-left: 50px;
}

@media screen and (min-width: 768px) {
  .gxIcon {
    padding-bottom: 16px;
  }
  .gxLabel {
    padding-bottom: 13px;
  }
  .gxInput {
    padding-top: 14px;
    padding-bottom: 13px;
  }
  .gxIconPaddingLeftLarge {
    padding-left: 44px;
  }
}
</style>
