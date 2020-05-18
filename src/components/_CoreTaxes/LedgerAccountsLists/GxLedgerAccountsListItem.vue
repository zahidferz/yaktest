<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxLedgerAccountsListItem',
  data() {
    return {
      expand: false,
    }
  },
  components: {
    GxIcon,
    GxLedgerAccountsList: () =>
      // Debido a que son componentes recursivos marca error al importar por que genera una dependencia de bucle,
      // por lo que la solución fue agregar una importación dinamica, se reviso con Jhonatan
      import('@components/_CoreTaxes/LedgerAccountsLists/GxLedgerAccountsList'),
  },
  props: {
    ledgerAccount: {
      type: Object,
      default: null,
    },
  },
  computed: {
    GetNumberOfAccountsByParts() {
      return this.ledgerAccount.number.split('-')
    },
    GetSubAccountsCount() {
      if (this.ledgerAccount.subAccounts === null) return 0
      return this.ledgerAccount.subAccounts.length
    },
  },
  methods: {
    showSubAccounts() {
      this.expand = !this.expand
    },
  },
}
</script>

<template>
  <li class="mb-2">
    <div
      @click="showSubAccounts"
      class="flex align-middle rounded hover:bg-gray-300"
      :class="{
        'cursor-pointer': GetSubAccountsCount > 0,
      }"
    >
      <div
        class="inline-flex w-4 pl-1 font-bold"
        :class="['text-ledgerAccount-' + ledgerAccount.type]"
      >
        {{ ledgerAccount.parent === null ? 'M' : '' }}</div
      >
      <div class="inline-flex w-4 ml-3 mr-3"
        ><GxIcon
          v-if="GetSubAccountsCount > 0"
          class="flex justify-end flex-grow w-4 h-4 pt-px pr-px border border-solid rounded-full cursor-pointer border-list-arrowBorder text-list-arrowBorder"
          :icon="!expand ? 'chevron_right' : 'expand_less'"
          :class="{ 'bg-list-arrow': !expand }"
      /></div>
      <div class="inline-flex text-white ">
        <span
          class="pt-px pl-2 pr-2 mr-px font-bold text-2xs"
          v-for="(item, idx) in GetNumberOfAccountsByParts"
          :class="[
            'bg-ledgerAccount-' + ledgerAccount.type,
            { 'rounded-tl rounded-bl': idx === 0 },
          ]"
          :key="idx"
        >
          {{ item }}
        </span>
      </div>
      <div
        class="inline-flex pl-5 text-black sm:hover:bg-secondary-20"
        :class="{
          'font-bold': GetSubAccountsCount > 0,
        }"
      >
        {{ ledgerAccount.name }}</div
      >
    </div>

    <transition name="slide" v-if="GetSubAccountsCount > 0">
      <div v-show="expand">
        <GxLedgerAccountsList
          class="mt-2"
          :ledgerAccounts="
            ledgerAccount.subAccounts === null ? [] : ledgerAccount.subAccounts
          "
          :key="ledgerAccount.ledgerAccountId"
          :name="ledgerAccount.ledgerAccountId"
        />
      </div>
    </transition>
  </li>
</template>

<style scoped>
.slide-enter-active {
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
