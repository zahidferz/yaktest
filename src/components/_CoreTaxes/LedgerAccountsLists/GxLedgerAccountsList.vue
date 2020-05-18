<script>
import GxLedgerAccountsListItem from '@components/_CoreTaxes/LedgerAccountsLists/GxLedgerAccountsListItem'
export default {
  name: 'GxLedgerAccountsList',
  components: {
    GxLedgerAccountsListItem,
  },
  props: {
    ledgerAccounts: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {}
  },
}
</script>

<template>
  <ul class="font-nunito">
    <GxLedgerAccountsListItem
      v-for="(item, index) in ledgerAccounts"
      :key="index"
      :ledgerAccount="item"
    />
  </ul>
</template>
