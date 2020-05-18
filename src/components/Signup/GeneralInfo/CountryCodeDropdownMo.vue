<script>
// CountryFlags.json comes from @src/utils/CountryFlags.js
import CountryFlags from '@src/assets/Catalogos/CountryFlags.json'
export default {
  name: 'CountryCodeDropdownMo',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      countries: CountryFlags,
      innerValue: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.innerValue = newVal
    },
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>
<template>
  <select
    v-model="innerValue"
    style="width:89px"
    class="pl-4 pr-2 text-lg text-black truncate bg-white rounded-l-lg rounded-r-none gxSelect focus:outline-none"
    @change="$emit('change')"
  >
    <option
      v-for="country in countries"
      :key="country.country"
      :value="country.code"
      >{{ `${country.emoji} ${country.code}` }}</option
    >
  </select>
</template>
<style lang="scss" scoped>
.gxSelect {
  padding-top: 12px;
  padding-bottom: 11px;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
