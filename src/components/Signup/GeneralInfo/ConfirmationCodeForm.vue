<script>
import ConfirmationCodeInput from '@components/Signup/GeneralInfo/ConfirmationCodeInput'
export default {
  name: 'ConfirmationCodeForm',
  components: {
    ConfirmationCodeInput,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      input0: '',
      input1: '',
      input2: '',
      input3: '',
      focusedInput: '0',
    }
  },
  computed: {
    joinData() {
      return this.input0 + this.input1 + this.input2 + this.input3
    },
  },
  watch: {
    value(newVal) {
      // Keep order of the empty inputs
      // newVal = '134'
      // input0= '1'
      // input1: '',
      // input2: '3',
      // input3: '4',
      if (newVal === this.joinData) return
      this.fillForm(newVal)
    },
    joinData(newVal) {
      this.$emit('input', this.joinData)
    },
  },
  created() {
    if (this.value) {
      this.fillForm(this.value)
    }
  },
  mounted() {
    if (this.$refs.input0) {
      this.$refs.input0.focus()
    }
  },
  methods: {
    parseValue(val) {
      return val.replace(/\D/g, '')
    },
    fillForm(text) {
      if (!text) {
        this.input0 = ''
        this.input1 = ''
        this.input2 = ''
        this.input3 = ''
        this.$nextTick(() => {
          this.$refs.input0.focus()
        })
        return
      }
      const values = this.parseValue(text)
        .split('')
        .slice(0, 4)
      values.forEach((value, index) => {
        this[`input${index}`] = value
      })
    },
    focusInput(index) {
      if (index <= 0) {
        this.$refs.input0.focus()
        return
      }
      if (index >= 3) {
        this.$refs.input3.focus()
        return
      }
      this.$refs[`input${index}`].focus()
    },
  },
}
</script>
<template>
  <div class="inline-flex flex-col">
    <form class="w-full" @submit.prevent="">
      <fieldset>
        <div class="flex w-full justify-center mt-2">
          <ConfirmationCodeInput
            ref="input0"
            key="input0"
            v-model="input0"
            :error="error"
            :disabled="disabled"
            :index="0"
            @move="focusInput"
          />
          <ConfirmationCodeInput
            ref="input1"
            key="input1"
            v-model="input1"
            :disabled="disabled"
            :error="error"
            :index="1"
            class="mx-4"
            @move="focusInput"
          />
          <ConfirmationCodeInput
            ref="input2"
            key="input2"
            v-model="input2"
            :disabled="disabled"
            :index="2"
            :error="error"
            class="mr-4"
            @move="focusInput"
          />
          <ConfirmationCodeInput
            ref="input3"
            key="input3"
            v-model="input3"
            :disabled="disabled"
            :error="error"
            :index="3"
            @move="focusInput"
          />
        </div>
      </fieldset>
    </form>
    <p
      v-if="error && !customMessage"
      class="mt-1 text-white de:text-alert text-sm de:text-2xs"
      >Código de confirmación incorrecto</p
    >
    <p
      v-if="customMessage"
      class="mt-1 text-white de:text-black text-sm de:text-2xs"
      >{{ customMessage }}</p
    >
  </div>
</template>
