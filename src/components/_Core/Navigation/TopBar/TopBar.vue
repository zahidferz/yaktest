<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import TopBarLeftDrawer from './TopBarLeftDrawer.vue'
import TopBarRightDrawer from './TopBarRightDrawer.vue'

export default {
  components: {
    GxIcon,
    TopBarLeftDrawer,
    TopBarRightDrawer,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    dark: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'keyboard_backspace',
    },
    iconClickHandler: {
      type: Function,
      default: null,
    },
    iconRightClickHandler: {
      type: Function,
      default: () => {
        this.$router.gxAnim = 'slide-right'
        this.$router.back()
      },
    },
    iconRight: {
      type: String,
      default: '',
    },
    scrolled: {
      type: Boolean,
      default: false,
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
    hasDrawer: {
      type: Boolean,
      default: false,
    },
    hasDrawerRight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openDrawer: false,
      openDrawerRight: false,
      showSearchBar: false,
      innerTopBarSearch: this.value,
    }
  },
  computed: {
    aDrawerIsOpen() {
      return this.openDrawer || this.openDrawerRight
    },
  },
  watch: {
    innerTopBarSearch(newVal) {
      this.$emit('input', newVal)
    },
    $route(to) {
      if (to.query.leftDrawer) {
        this.openDrawer = true
      }
    },
  },
  mounted() {
    if (this.$route && this.$route.query.pendientes) {
      setTimeout(() => {
        this.openDrawer = true
      }, 2000)
    }
    if (this.$route && this.$route.query.leftDrawer) {
      this.openDrawer = true
    }
  },
  methods: {
    onClose() {
      this.openDrawer = false
    },
    onLeftIconClick() {
      if (this.iconClickHandler) {
        this.iconClickHandler()
        return
      }
      this.goBack()
    },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
    showSearch() {
      this.showSearchBar = true
      // Wait for input to be rendered and set focus
      this.$nextTick(() => {
        this.$refs.inputSearch.focus()
      })
    },
    clearSearch() {
      this.showSearchBar = false
      this.innerTopBarSearch = ''
    },
  },
}
</script>

<template>
  <nav
    :class="{
      'shadow-3': scrolled,
      'bg-primary': !dark,
      'text-white ': dark,
      'text-white': !dark,
    }"
    class="z-10 flex items-center px-4 py-5 gx-h5 h-14"
    role="navigation"
  >
    <div v-if="showSearchBar" class="flex items-center flex-grow">
      <GxIcon
        transparent
        icon="close"
        class="pr-4 cursor-pointer "
        @click="clearSearch"
      />
      <input
        ref="inputSearch"
        v-model="innerTopBarSearch"
        class="flex-grow bg-transparent outline-none"
        type="text"
      />
    </div>
    <div v-else class="flex items-center flex-grow">
      <!-- Drawer takes priority over a left icon -->
      <div v-if="hasDrawer" class="flex items-center">
        <GxIcon
          transparent
          :icon="icon"
          class="pr-4 cursor-pointer text-primary"
          @click.prevent.stop="openDrawer = !openDrawer"
        />
        <transition name="slide-left">
          <TopBarLeftDrawer
            :a-drawer-is-open="aDrawerIsOpen"
            :open-drawer="openDrawer"
            @slidedraweropen="openDrawer = true"
            @close="onClose"
          />
        </transition>
      </div>
      <GxIcon
        v-else-if="icon"
        transparent
        :icon="icon"
        class="w-12 pr-4 text-left cursor-pointer focus:outline-none"
        html-tag="button"
        @click="onLeftIconClick"
      />
      <p class="flex flex-grow justify-left gx-h5">{{ title }}</p>
      <GxIcon
        v-if="hasSearch"
        transparent
        icon="search"
        class="pl-4 cursor-pointer"
        @click="showSearch"
      />
      <div v-else-if="hasDrawerRight" class="flex items-center">
        <GxIcon
          transparent
          icon="more_vert"
          class="pl-4 cursor-pointer"
          @click.prevent.stop="openDrawerRight = !openDrawerRight"
        />
        <transition name="slide-left">
          <!-- <TopBarLeftDrawer v-if="openDrawer" @close="openDrawer = false" /> -->
          <TopBarRightDrawer
            :a-drawer-is-open="aDrawerIsOpen"
            :open-drawer="openDrawerRight"
            @slidedraweropen="openDrawerRight = true"
            @close="openDrawerRight = false"
          />
        </transition>
      </div>
      <GxIcon
        v-else-if="iconRight"
        transparent
        :icon="iconRight"
        class="pl-4 cursor-pointer"
        @click="iconRightClickHandler"
      />
    </div>
  </nav>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

// Sliding animations for drawers
.drawerRight {
  position: fixed;
  top: 0;
  right: -80%;
  bottom: 0;
  z-index: 5;
  // min-width: 80%;
  // max-width: 80%;
  // width: 100%;
}
.drawerRightIsActive {
  right: 0;
}

@media screen and (min-width: 769px) {
  .drawerLeft,
  .drawerRight {
    min-width: 300px;
  }
}
// Slide animations
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: 0.3s;
}
.slide-right-enter {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}
.slide-left-enter {
  transform: translate(-100%, 0);
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}
</style>
