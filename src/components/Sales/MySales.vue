<script>
import SalesSummaryChart from '@components/Sales/SalesSummaryChart'
import GxDeFilters from '@components/_Core/Filters/GxDeFilters'
import Sentinel from '@components/_Core/Utils/Sentinel'
import GxIcon from '@components/_Core/Icons/GxIcon'
import {
  LOCAL_COMPANY,
  COMPANY_SALES_SUMMARY,
  COMPANY_INFO,
} from '@src/apollo/queries'
import { REQUEST_SALES_BY_TIME_PERIOD } from '@src/apollo/mutations'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
import SalesSearch from '@components/Sales/SalesSearch'
import GxModal from '@components/_Core/Modals/GxModal'
import SalesMobileFilters from '@components/Sales/SalesMobileFilters'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import GxDisabledInput from '@components/_Core/Forms/GxDisabledInput'
import GxInput from '@components/_Core/Forms/GxInput'
import GxSnackbar from '@components/_Core/Modals/GxSnackbar'
export default {
  name: 'MySales',
  components: {
    GxInput,
    SalesSummaryChart,
    GxDeFilters,
    GxDesktopSearchInput,
    SalesSearch,
    GxSnackbar,
    GxIcon,
    GxModal,
    SalesMobileFilters,
    GxCardModal,
    Sentinel,
    GxDisabledInput,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
    },
    companySummary: {
      query: COMPANY_SALES_SUMMARY,
      variables() {
        return {
          companyNumber: this.company.number,
          searchedYear: Number(this.searchedYear),
        }
      },
      update(data) {
        return data.myAccount.companies[0].company
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      collapsed: false,
      noSalesOnMonthMessage: '',
      activatedKey: Date.now(),
      downloadSalesSuccess: null,
      downloadSalesLoading: false,
      email: '',
      company: null,
      companySummary: null,
      selectedFilters: [],
      selectedMonth: new Date().getMonth(),
      textInput: this.searchTerm,
      mobileFilters: false,
      filtersOpen: false,
      searchedYear: String(new Date().getFullYear()),
      showSalesDownloadModal: false,
      excelDownloadRange: '',
      downloadSalesError: '',
      noResults: false,
      filters: [
        {
          name: 'Estado de la venta',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Facturada',
              enum: 'fullyInvoiced',
            },
            {
              translate: 'No facturada',
              enum: 'notInvoiced',
            },
          ],
        },
        {
          name: 'Estado de cobro',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Pendientes',
              enum: 'notPaid',
            },
            {
              translate: 'Parcial',
              enum: 'partiallyPaid',
            },
            {
              translate: 'Cobrada',
              enum: 'fullyPaid',
            },
          ],
        },
        {
          typeFilter: 'range',
          name: 'Periodo de ventas',
        },
      ],
      filtersMobile: [
        {
          typeFilter: 'range',
          name: 'Periodo de ventas',
        },
        {
          name: 'Estado de la venta',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Facturada',
              enum: 'fullyInvoiced',
            },
            {
              translate: 'No facturada',
              enum: 'notInvoiced',
            },
          ],
        },
        {
          name: 'Estado de cobro',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Pendiente',
              enum: 'notPaid',
            },
            {
              translate: 'Parcial',
              enum: 'partiallyPaid',
            },
            {
              translate: 'Cobrada',
              enum: 'fullyPaid',
            },
          ],
        },
      ],
      excelDownloadStartDate: '',
      excelDownloadEndDate: '',
    }
  },
  computed: {
    startDate() {
      if (this.selectedPeriod) {
        return this.selectedPeriod.startDate
      }
      if (
        this.searchedYear &&
        !this.textInput &&
        this.selectedFilters.length === 0
      ) {
        return new Date(Number(this.searchedYear), 0, 1).toISOString()
      }
      return null
    },
    selectedPeriod() {
      const filter = this.selectedFilters.find((filter) => {
        return filter.name === 'rango' || filter.name === 'Periodo de ventas'
      })
      if (filter) {
        if (filter.range) {
          this.$emit('startDate', filter.range.startDate)
          this.$emit('endDate', filter.range.endDate)
        }
        return filter.range
      }
      return null
    },
    invoicedStatusEnum() {
      const filter = this.selectedFilters.find((filter) => {
        return filter.name === 'Estado de la venta'
      })
      if (filter) {
        return filter.checked
      }
      return []
    },
    paymentStatus() {
      const filter = this.selectedFilters.find((filter) => {
        return filter.name === 'Estado de cobro'
      })
      if (filter) {
        return filter.checked
      }
      return []
    },
    endDate() {
      if (this.selectedPeriod) {
        return this.selectedPeriod.endDate
      }
      if (
        typeof this.selectedMonth === 'number' &&
        !this.textInput &&
        this.selectedFilters.length === 0
      ) {
        return new Date(
          Number(this.searchedYear),
          Number(this.selectedMonth) + 1,
          0
        ).toISOString()
      }
      if (!this.textInput) {
        return new Date(Number(this.searchedYear), 12, 0).toISOString()
      }
      return null
    },
  },
  watch: {
    searchTerm(newVal) {
      this.textInput = newVal
    },
    excelDownloadRange() {
      this.downloadSalesError = ''
    },
    myAccount: {
      handler: function(newVal) {
        if (newVal) {
          this.email = newVal.email
        }
      },
      immediate: true,
    },
    textInput(newVal) {
      if (newVal) {
        this.selectedFilters = []
      }
    },
  },
  activated() {
    this.refetchData()
  },
  methods: {
    refetchData() {
      this.$refs.salesSearch.refetchData()
    },
    async downloadSales() {
      if (!this.excelDownloadStartDate || !this.excelDownloadEndDate) {
        this.downloadSalesError = 'Debes ingresar un periodo válido'
        return
      }

      this.downloadSalesError = ''

      try {
        this.downloadSalesLoading = true

        let startDate = this.excelDownloadStartDate
        let endDate = this.excelDownloadEndDate

        await this.$apollo.mutate({
          mutation: REQUEST_SALES_BY_TIME_PERIOD,
          variables: {
            data: {
              companyNumber: this.company.number,
              startDate,
              endDate,
            },
          },
        })
        this.downloadSalesLoading = false
        this.downloadSalesSuccess = true
      } catch (e) {
        this.downloadSalesLoading = false
        this.downloadSalesError = e
        /* eslint-disable */
        console.log(e)
        /* eslint-enable */
      }
    },
    onHidden() {
      if (this.selectedFilters.length > 0 || this.textInput) return
      this.collapsed = true
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY
        const barChart = this.$refs.SalesSummaryChart.$el
        const barChartConatainer = this.$refs.chartContainer
        const newHeight = barChartConatainer.offsetHeight - 155
        barChart.style.transform = 'translateY(-155px)'
        barChartConatainer.style.height = `${newHeight}px`
        this.$refs.SalesSummaryChart.$refs.GxChartBarCard.$refs.GxCardCore.$el.classList.remove(
          'shadow-2'
        )
        window.scrollTo(0, Math.max(scrollPosition, 1000))
      })
    },
    onVisible() {
      if (this.selectedFilters.length > 0 || this.textInput) return
      this.collapsed = false
      requestAnimationFrame(() => {
        const barChart = this.$refs.SalesSummaryChart.$el
        const barChartConatainer = this.$refs.chartContainer
        barChart.style.transform = 'translateY(0)'
        barChartConatainer.style.height = 'auto'
        this.$refs.SalesSummaryChart.$refs.GxChartBarCard.$refs.GxCardCore.$el.classList.add(
          'shadow-2'
        )
      })
    },
    onCollapse() {
      if (this.collapsed) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        this.$refs.salesSearch.$el.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }
    },
    onNoResults(event) {
      if (this.selectedFilters.length > 0 || this.textInput) {
        this.noResults = event
        return
      }
      const currentMonthHasSales = this.currentMonthHasSales()
      if (currentMonthHasSales) return
      const previousMonthWithSales = this.findpreviousMonthWithSales()
      const monthName = this.getMonthName(this.selectedMonth)
      if (previousMonthWithSales > -1) {
        this.noSalesOnMonthMessage = `No tienes ventas en ${monthName}`
        this.selectedMonth = previousMonthWithSales
        return
      }
      this.noSalesOnMonthMessage =
        this.selectedMonth > 0
          ? `No tienes ventas de enero a ${monthName}`
          : `No tienes ventas en enero`
    },
    currentMonthHasSales() {
      const result = this.$refs.SalesSummaryChart.chartData[this.searchedYear][
        this.selectedMonth
      ]
      return result.amount > 0
    },
    findpreviousMonthWithSales() {
      const result = this.$refs.SalesSummaryChart.chartData[this.searchedYear]
        .map(({ amount }) => amount)
        .slice(0, this.selectedMonth)
        .findIndex((amount) => amount > 0)
      return result
    },
    getMonthName(month) {
      const currentYear = new Date().getFullYear()
      const date = new Date(currentYear, month, 1)
      return date.toLocaleString('es-MX', { month: 'long' })
    },
    onCloseSnackbar() {
      this.noSalesOnMonthMessage = ''
    },
  },
}
</script>
<template>
  <div class="flex flex-grow flex-col">
    <Sentinel
      v-if="$mq === 'mo'"
      ref="Sentinel"
      @hidden="onHidden"
      @visible="onVisible"
    />
    <div
      :class="{
        'shadow-3': collapsed,
        'sticky top-0 z-20':
          $mq === 'mo' && selectedFilters.length === 0 && !textInput,
      }"
      class=" relative bg-white"
    >
      <template v-if="selectedFilters.length === 0 && !textInput">
        <h1
          :class="{ 'pt-2 pb-6': collapsed }"
          class="text-gray-500 de:text-gray-400  absolute top-0 z-1 w-full bg-white font-bold pl-4 de:pl-0 gx-section-title flex items-center"
          >RESUMEN DE VENTAS
          <button class=" text-black ml-auto mr-4" @click="onCollapse">
            <GxIcon
              :icon="collapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
            />
          </button>
        </h1>
        <div ref="chartContainer">
          <SalesSummaryChart
            ref="SalesSummaryChart"
            v-model="selectedMonth"
            style="transition:transform 0.2s; transform:translateY(0);"
            :searched-year="searchedYear"
            class="mt-4 mx-4 de:mx-0"
            level="company"
            @refetch="refetchData"
            @searchedYear="searchedYear = $event"
          />
        </div>
      </template>
      <p
        v-if="
          $mq === 'mo' &&
            (selectedFilters.length > 0 || textInput) &&
            !noResults
        "
        class="ml-4 gx-section-title font-bold mb-4 leading-none text-gray-500"
      >
        <template v-if="textInput">
          RESULTADOS DE BÚSQUEDA
        </template>
        <template v-else>
          RESULTADOS
        </template>
      </p>
      <div
        v-if="$mq === 'mo'"
        class="w-full flex  items-center mb-2 px-4 overflow-x-auto overflow-y-hidden"
      >
        <SalesMobileFilters
          v-model="selectedFilters"
          :class="{
            'mt-8': !collapsed && selectedFilters.length === 0 && !textInput,
            'mt-0': collapsed || selectedFilters.length > 0 || textInput,
          }"
          :filters="filtersMobile"
        />
      </div>
    </div>
    <p
      v-if="$mq === 'de' && (selectedFilters.length > 0 || textInput)"
      class="gx-section-title font-bold leading-none text-gray-400"
      >RESULTADOS DE BÚSQUEDA</p
    >
    <MqLayout
      mq="de"
      style="top:2rem"
      class="mt-4 flex flex-col items-center   bg-white"
    >
      <!-- Make desk filters sticky-->
      <!-- class="mt-4 flex flex-col items-center sticky z-20  bg-white" -->
      <div class="w-full border-t border-gray-200 justify-end pt-2 flex">
        <GxDesktopSearchInput
          v-model="textInput"
          autofocus
          label="Buscar venta"
        />
      </div>
      <div
        class="flex justify-between w-full border-b border-gray-200 border-t mt-2"
      >
        <button
          class="w-30 p-2 cursor-pointer flex justify-center items-center hover:text-primary-500 hover:bg-secondary-50 hover:border-primary-500 border-white border-b"
          @click.stop.prevent="showSalesDownloadModal = true"
          ><GxIcon class="mr-1" icon="download" /><span class="leading-none"
            >Descargar</span
          ></button
        >
        <div class="flex items-center flex-end pl-2 py-2">
          <GxDeFilters
            v-model="selectedFilters"
            group-by-filter
            class="flex-grow"
            :filters="filters"
            @filtersOpen="filtersOpen = $event"
          />
        </div>
      </div>
    </MqLayout>
    <SalesSearch
      ref="salesSearch"
      :key="activatedKey"
      :payment-status="paymentStatus"
      :invoiced-status-enum="invoicedStatusEnum"
      :start-date="startDate"
      :end-date="endDate"
      :search-with-filters="selectedFilters.length > 0 || !!textInput"
      :search-term="textInput"
      @noResults="onNoResults"
    />
    <GxModal
      v-if="showSalesDownloadModal"
      overflow-visible
      @close="showSalesDownloadModal = false"
    >
      <div
        :class="{ 'de:pb-6': $slots.actions }"
        class="flex flex-col items-center w-108 pt-8 de:shadow-3 de:rounded-lg  bg-white  pb-6 px-6"
        style="overflow: visible;"
      >
        <form
          class="flex flex-col w-full items-center"
          @submit.prevent="downloadSales"
        >
          <h3 class="gx-h5 font-bold">Descargar Excel de ventas</h3>
          <div class="flex items-center mt-8">
            <GxInput
              ref="startDate"
              v-model="excelDownloadStartDate"
              pattern="date"
              placeholder="Inicio"
              label="Inicio"
              icon="calendar_today"
              class="flex-grow"
            />
            <p class="mx-4">-</p>
            <GxInput
              ref="endDate"
              v-model="excelDownloadEndDate"
              pattern="date"
              placeholder="Final"
              label="Final"
              class="flex-grow"
              icon="calendar_today"
              :disabled="!excelDownloadStartDate"
              :min-datetime="excelDownloadStartDate"
            />
          </div>
          <GxDisabledInput
            v-if="email"
            icon="email"
            :value="email"
            class="w-full px-4"
            label="Correo Electrónico"
            name="Correo Electrónico"
          />
          <p class="text-center de:gx-caption gx-caption mb-4"
            >Tu información está protegida.
            <GxTextLink
              target-blank
              :to="{ name: 'privacypolicy' }"
              class="font-bold leading-none"
              >Conoce cómo.</GxTextLink
            ></p
          >
          <p v-if="downloadSalesError" class="text-alert mb-2 mt-2">{{
            downloadSalesError
          }}</p>
          <GxButton type="submit" :loading="downloadSalesLoading"
            >Enviar</GxButton
          >
        </form>
      </div>
    </GxModal>
    <GxCardModal
      v-if="downloadSalesSuccess"
      headline="Revisa tu correo"
      text-body="Te hemos enviado el archivo Excel con tus ventas"
      :card-img="$utils.alertImages.CheckEmail"
      @close="downloadSalesSuccess = false"
    ></GxCardModal>
    <GxSnackbar
      v-if="noSalesOnMonthMessage"
      :message="noSalesOnMonthMessage"
      @close="onCloseSnackbar"
    />
  </div>
</template>
