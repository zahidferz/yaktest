<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxTabs from '@components/_Core/Navigation/GxTabs'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
// import GxIcon from '@components/_Core/Icons/GxIcon'
import GxMoFilterScreen from '@components/_Core/Filters/GxMoFilterScreen'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
// import GxDeFilters from '@components/_Core/Filters/GxDeFilters'
import PendingTodos from '@components/Todos/PendingTodos'
import SolvedTodos from '@components/Todos/SolvedTodos'
import debounce from 'lodash/debounce'
import { LOCAL_COMPANY, BRANCHES } from '@src/apollo/queries'
export default {
  name: 'Todos',
  components: {
    LayoutWebMobile,
    GxMoFilterScreen,
    // GxDeFilters,
    GxDesktopSearchInput,
    GxTabs,
    PendingTodos,
    // GxIcon,
    SolvedTodos,
    GxDesktopHeader,
  },
  apollo: {
    company: LOCAL_COMPANY,
    branches: {
      query: BRANCHES,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company || !this.company.number
      },
      update(data) {
        return data.myAccount.companies[0].company.branches
      },
      error(error) {
        this.errorModal = this.$utils.parseServerError(error)
      },
    },
  },
  data() {
    return {
      company: null,
      showFilters: false,
      activeTab: 'pending',
      textInput: '',
      selectedFilter: [],
      debouncedUpdateTextInput: null,
      errorModal: null,
      tabs: [
        {
          label: 'Mis Pendientes',
          name: 'pending',
        },
        {
          label: 'resueltos',
          name: 'resolved',
        },
      ],
    }
  },
  computed: {
    placeholder() {
      if (this.activeTab === 'pending') {
        return 'Buscar en Mis pendientes'
      }
      return 'Buscar en Resueltos'
    },
    branchOptions() {
      return {
        name: 'Sucursal',
        label: 'name',
        trackBy: 'branchNumber',
        options: this.branches ? this.branches : [],
      }
    },
  },
  created() {
    this.debouncedUpdateTextInput = debounce((text) => {
      this.textInput = text
    }, 300)
  },
}
</script>
<template>
  <LayoutWebMobile
    icon="warning"
    title="Pendientes"
    :placeholder="placeholder"
    top-bar-class-with-scroll="bg-primary text-white"
    has-search
    no-horizontal-padding
    tabs
    icon-class-without-scroll="text-primary"
    icon-class-with-scroll="text-white"
    on-search-classes="bg-primary-500 text-white"
    @search="debouncedUpdateTextInput"
  >
    <template slot="topbar-right">
      <!-- <GxIcon
        html-tag="button"
        class="mr-4 text-xl"
        icon="filter_list"
        @click.stop="showFilters = true"
      /> -->
      <GxMoFilterScreen
        v-if="showFilters"
        v-model="selectedFilter"
        title="Filtrar pendientes"
        :filters="[branchOptions]"
        @close="showFilters = false"
      />
    </template>
    <template v-slot:header2>
      <GxTabs
        :initial-tab="activeTab"
        :no-selected-black="true"
        :tabs="tabs"
        :skip-scroll-into-view="true"
        @activeTab="activeTab = $event"
      />
    </template>
    <template v-slot:default>
      <header
        v-if="$mq === 'de'"
        class="flex flex-col justify-center w-full px-8 font-bold "
      >
        <GxDesktopHeader header="Pendientes" icon="warning" />
        <div class="border-t border-b border-gray-200">
          <div
            class="flex items-center justify-end py-2 pr-2 border-b border-gray-200"
          >
            <!-- <GxDeFilters
              v-if="branchOptions.options.length > 0"
              v-model="selectedFilter"
              class="flex-grow"
              :filters="[branchOptions]"
            /> -->
            <GxDesktopSearchInput
              :value="textInput"
              class="w-40 ml-8"
              :label="placeholder"
              @input="debouncedUpdateTextInput"
            />
          </div>
          <div class="pt-2 border-gray-200 ">
            <GxTabs
              initial-tab="pending"
              :tabs="tabs"
              @activeTab="activeTab = $event"
            />
          </div>
        </div>
      </header>
      <PendingTodos
        v-if="activeTab === 'pending'"
        :search-term="textInput"
        :selected-branches="
          selectedFilter.length > 0 ? selectedFilter[0].checked : []
        "
      />
      <SolvedTodos
        v-else
        :search-term="textInput"
        :selected-branches="
          selectedFilter.length > 0 ? selectedFilter[0].checked : []
        "
      />
      <GxCardModal
        v-if="errorModal"
        headline="Error"
        :text-body="errorModal"
        :card-img="errorTodoImg"
        alt="Error"
        @close="errorModal = null"
      />
    </template>
  </LayoutWebMobile>
</template>
