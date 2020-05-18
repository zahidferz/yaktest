<script>
import NotificationIcon from '@components/Desktop/NotificationIcon'
import ProfileIcon from '@components/Desktop/ProfileIcon'
import AsideMain from '@src/router/layouts/AsideMain.vue'
export default {
  name: 'LayoutWeb',
  components: {
    NotificationIcon,
    ProfileIcon,
    AsideMain,
  },
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    breadcrumb: {
      type: Boolean,
      default: false,
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
    onSearchClasses: {
      type: String,
      default: 'text-black',
    },
    placeholder: {
      type: String,
      default: null,
    },
    hasDrawer: {
      type: Boolean,
      default: false,
    },
    hasDrawerRight: {
      type: Boolean,
      default: false,
    },
    hasStickyElement: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: '',
    },
    iconClassWithoutScroll: {
      type: String,
      default: 'text-black',
    },
    iconClassWithScroll: {
      type: String,
      default: 'text-primary',
    },
    topBarClassWithScroll: {
      type: String,
      default: '',
    },
    topBarClassWithoutScroll: {
      type: String,
      default: 'text-black bg-white',
    },
    iconClickHandler: {
      type: Function,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    iconRightClickHandler: {
      type: Function,
      default: null,
    },
    withPaddingBottom: {
      type: Boolean,
      default: true,
    },
    noHorizontalPadding: {
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Boolean,
      default: false,
    },
    breadcrumbClassesWithScroll: {
      type: Object,
      default: () => ({
        icon: 'text-gray-700',
        next: 'text-black',
        active: 'text-primary',
      }),
    },
    breadcrumbClassesWithoutScroll: {
      type: Object,
      default: () => ({
        icon: 'text-gray-700',
        next: 'text-black',
        active: 'text-primary',
      }),
    },
    myAccount: {
      type: Object,
      default: null,
    },
    todos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      hasScrolled: false,
      activeDeskTopBarMenu: null,
      drawerLeft: false,
      mobileSearch: false,
      drawerRight: false,
      customTopBar: false,
      drawerOPen: false,
      search: '',
    }
  },
  computed: {
    hasTopBar() {
      return this.title || this.icon || this.iconRight || this.hasDrawer
    },
    iconClasses() {
      if (this.hasScrolled) {
        return this.iconClassWithScroll
      }
      return this.iconClassWithoutScroll
    },
    topBarClasses() {
      if (this.hasScrolled) {
        if (this.topBarClassWithScroll.includes('bg-')) {
          return this.topBarClassWithScroll
        }
        return this.topBarClassWithScroll
      }
      return this.topBarClassWithoutScroll ? this.topBarClassWithoutScroll : ''
    },
  },
  watch: {
    search(newValue) {
      if (this.$mq === 'mo') {
        this.$emit('search', newValue)
      }
    },
  },
  reactiveProvide: {
    name: 'topBarSearch',
    include: ['search'],
  },
  mounted() {
    if (this.$route.query.drawerRight) {
      this.$nextTick(() => {
        this.drawerRight = true
        let query = Object.assign({}, this.$route.query)
        delete query.drawerRight
        this.$router.replace({ query })
      })
    }

    let lastKnownScrollPosition = 0
    let ticking = false

    if (this.$mq === 'de') {
      if (document.getElementById('gxDeMain')) {
        document.getElementById('gxDeMain').addEventListener('scroll', (e) => {
          lastKnownScrollPosition = e.target.scrollTop
          if (!ticking) {
            window.requestAnimationFrame(() => {
              this.hasScrolled = lastKnownScrollPosition > 0
              ticking = false
            })

            ticking = true
          }
        })
      }
    } else {
      window.addEventListener('scroll', (e) => {
        lastKnownScrollPosition = window.scrollY
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.hasScrolled = lastKnownScrollPosition > 0
            ticking = false
          })

          ticking = true
        }
      })
    }
  },
  methods: {
    onCloseDrawer(drawer) {
      this[drawer] = false
      this.drawerOPen = false
    },
    cancelMobileSearch() {
      this.search = null
      this.mobileSearch = false
    },
    focusMobileSearch() {
      this.$refs.mobileSearch && this.$refs.mobileSearch.focus()
    },
    onActiveMenu(componentName) {
      this.activeDeskTopBarMenu = componentName
    },
    showCustomTopBar() {
      this.customTopBar = true
    },
    hideCustomTopBar() {
      this.customTopBar = false
    },
  },
}
</script>

<template>
  <MqLayout id="layoutDesk" key="layoutDesk" mq="de" class="w-screen bg-white">
    <nav
      v-if="hasTopBar"
      class="sticky top-0 z-10 flex items-center w-full h-8 bg-white gxDesktopTopNav gx-h5 shadow-2"
      role="navigation"
    >
      <div class="flex items-center justify-between flex-grow pr-4">
        <div class="flex items-center self-stretch pl-4 de:gx-caption">
          <p
            v-if="myAccount"
            class="pr-4 mr-4 font-bold border-r border-gray-300 border-solid"
            >{{
              myAccount.companies[0].company.commercialName
                ? myAccount.companies[0].company.commercialName
                : myAccount.companies[0].company.legalName
            }}
          </p>
          <p
            v-else
            class="pr-4 mr-4 font-bold text-transparent border-r border-gray-300 border-solid"
            >placeholder</p
          >
        </div>
        <div class="flex items-center">
          <NotificationIcon
            :active-menu="activeDeskTopBarMenu"
            class="mr-2"
            @activeMenu="onActiveMenu"
          />
          <ProfileIcon
            :my-account="myAccount"
            :active-menu="activeDeskTopBarMenu"
            @activeMenu="onActiveMenu"
          />
        </div>
      </div>
    </nav>
    <main
      id="gxDeMainNotStickyElement"
      class="flex flex-col w-full gxDeMain de:pt-12"
      :class="{
        'px-8': !noHorizontalPadding,
      }"
    >
      <slot />
    </main>
    <AsideMain class="z-1 gxDeAside" :todos="todos" />
  </MqLayout>
</template>
<style lang="scss" scoped>
#layout {
  width: 100%;
  min-height: 100%;
}
#layoutDesk {
  display: grid;
  grid: minmax(100vh, auto) / min-content;
  min-height: 100vh;
}
.gxStickyHeight {
  height: 100vh;
}
.gxDesktopTopNav {
  grid-area: 1 / 2 / -1 /-1;
}
.gxDeAside {
  grid-area: 1 / 1 / 2 / -1;
  height: 100vh;
}
.gxDeMain {
  grid-area: 1/ 2 / -1 / -1;
}
.gx-padding-menu {
  padding-bottom: 6.375rem;
}
.gxDeStickyContainer {
  top: 0;
}
// top-bar styles

.custom-slot-enter-active,
.custom-slot-leave-active,
.input-fade-enter-active {
  transition: opacity 0.2s ease-out;
}
.input-fade-leave-active {
  transition: opacity 0.2s ease-in;
}
.input-fade-enter,
.custom-slot-enter,
.custom-slot-leave-to,
.input-fade-leave-to {
  opacity: 0;
}
.top-bar {
  transition: background 0.3s ease-out;
}
.icon-button {
  font-size: 1.25rem;
}
.gxInput {
  font-size: 1.125rem;
  line-height: 1.125rem;
}
</style>
