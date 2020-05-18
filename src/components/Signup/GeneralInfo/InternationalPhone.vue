<script>
import CountryCodeDropdownMo from '@components/Signup/GeneralInfo/CountryCodeDropdownMo'
import GxTextFieldInternationalPhone from '@components/Signup/GeneralInfo/GxTextFieldInternationalPhone'
export default {
  name: 'InternationalPhone',
  components: {
    CountryCodeDropdownMo,
    GxTextFieldInternationalPhone,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      assistive: null,
      phone: this.value.phone,
      countryCode: this.value.countryCode,
    }
  },
  computed: {
    innerValue() {
      return {
        phone: this.phone,
        countryCode: this.countryCode,
      }
    },
  },
  watch: {
    countryCode() {
      this.setFocus()
    },
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.phone = newVal.phone
      this.countryCode = newVal.countryCode
    },
  },
  mounted() {
    setTimeout(() => {
      this.setFocus()
    }, 300)
  },
  methods: {
    setFocus() {
      this.$refs.phoneInput.setFocus()
    },
    isValid() {
      return !!(this.countryCode && this.phone)
    },
  },
}
</script>
<template>
  <div class="flex  w-full flex-col">
    <div class="flex ">
      <CountryCodeDropdownMo
        v-model="countryCode"
        class="flex-shrink-0 flex-grow-0"
        placeholder="CountryCodeDropdown"
      />
      <GxTextFieldInternationalPhone
        ref="phoneInput"
        v-model="phone"
        icon=""
        assistive=" "
        label="Celular"
        required
        autofocus
        :label-classes="{ gxInternationalPhone: true }"
        :input-classes="{ gxInternationalPhone: true }"
        @assistive="assistive = $event"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
    </div>
    <p v-if="assistive" class="text-sm de:text-2xs mt-2 text-white">{{
      assistive
    }}</p>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
// /deep/ match children css classes
/deep/ .gxInternationalPhone {
  padding-left: 0.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
