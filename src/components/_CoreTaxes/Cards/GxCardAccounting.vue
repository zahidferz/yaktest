<script>
import GxCardAccountingCompany from '@components/_CoreTaxes/Cards/GxCardAccountingCompany'
export default {
  name: 'GxCardAccounting',
  components: {
    GxCardAccountingCompany,
  },
  props: {
    business: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
}
</script>
<template>
  <div>
    <ul>
      <GxCardAccountingCompany
        class="mb-5"
        v-for="(item, index) in business"
        :key="index"
        :company="item"
      />
    </ul>
  </div>
</template>
