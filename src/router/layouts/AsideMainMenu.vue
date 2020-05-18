<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'AsideMainMenu',
  components: {
    GxIcon,
  },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
    accountingFirmMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openSubmenu: '',
    }
  },
  computed: {
    activeRouteName() {
      return this.$route.name
    },
    menu() {
      if (this.accountingFirmMenu) {
        return {
          dashboard: {
            title: 'Mi Contabilidad',
            to: { name: 'dashboard' },
            icon: 'attach_money',
            isActive:
              this.openSubmenu === 'Mi Contabilidad' ||
              this.$route.name === 'dashboard',
          },
          accountingReports: {
            title: 'Reportes Contables',
            icon: 'local_offer',
            isActive:
              this.openSubmenu === 'Reportes Contables' ||
              this.$route.name === 'accountingReports',
            path: 'web/#',
            isOpen: this.openSubmenu === 'Reportes Contables',
            children: [
              {
                title: 'Balanza',
                to: { name: 'sales' },
                icon: 'web_asset',
                path: 'web/ventas/clientes/',
              },
              {
                title: 'Conciliación de XMLs',
                to: { name: 'dashboard2' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Auxiliares',
                to: { name: 'dashboard3' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Libro Mayor',
                to: { name: 'dashboard4' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Libro Diario',
                to: { name: 'dashboard5' },
                icon: 'web_asset',
                path: 'web/#',
              },
            ],
          },
          financialReports: {
            title: 'Reportes Financieros',

            icon: 'trending_up',
            isActive:
              this.openSubmenu === 'Reportes Financieros' ||
              this.$route.name === 'financialReports',
            path: 'web/#',
            isOpen: this.openSubmenu === 'Reportes Financieros',
            children: [
              {
                title: 'Balance General',
                to: { name: 'dashboard6' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Conciliación de XMLs',
                to: { name: 'dashboard7' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Estado de Resultados',
                to: { name: 'dashboard8' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Variaciones en Capital',
                to: { name: 'dashboard9' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Flujo de Efectivo',
                to: { name: 'dashboard10' },
                icon: 'web_asset',
                path: 'web/#',
              },
            ],
          },
          otherReports: {
            title: 'Otros Reportes',

            icon: 'pie_chart',
            isActive:
              this.openSubmenu === 'Otros Reportes' ||
              this.$route.name === 'otherReports',
            path: 'web/#',
            isOpen: this.openSubmenu === 'Otros Reportes',
            children: [
              {
                title: 'DIOT',
                to: { name: 'dashboard11' },
                icon: 'web_asset',
                path: 'web/#',
              },
              {
                title: 'Contabilidad Electrónica',
                to: { name: 'dashboard12' },
                icon: 'web_asset',
                path: 'web/#',
              },
            ],
          },
        }
      } else {
        return {
          dashboard: {
            title: 'Mi Contabilidad',
            to: { name: 'dashboard' },
            icon: 'eco',
            isActive:
              this.openSubmenu === 'Mi Contabilidad' ||
              this.$route.name === 'dashboard',
          },
          myTeam: {
            title: 'Mi equipo',
            to: { name: 'myTeam' },
            icon: 'people',
            isActive:
              this.openSubmenu === 'Mi equipo' || this.$route.name === 'myTeam',
          },
        }
      }
    },
  },
  methods: {
    someChildrenIsActive(menuItem) {
      if (!menuItem.children) {
        return menuItem.to.name === this.$route.name
      }
      return menuItem.children.some((child) =>
        this.$route.fullPath.includes(child.path)
      )
    },
    onClickMenuItem(menuItem) {
      if (menuItem.to && this.$route.name != menuItem.to.name) {
        this.$router.push(menuItem.to)
      }
      this.openSubmenu =
        this.openSubmenu === menuItem.title ? '' : menuItem.title
    },
  },
}
</script>
<template>
  <ul class="py-2">
    <template v-for="menuItem in menu">
      <li :key="menuItem.name">
        <div
          class="flex justify-start w-full py-2 pl-4 cursor-pointer gx-menu-item group hover:bg-gray-200"
          :class="{
            'group-hover:text-primary-600':
              !menuItem.isActive && !someChildrenIsActive(menuItem),
            'gx-menu-item--active': menuItem.isActive,
          }"
          @click="onClickMenuItem(menuItem)"
        >
          <GxIcon
            class="z-1"
            :icon="menuItem.icon"
            :class="{
              'group-hover:text-primary-600': !menuItem.isActive,
              'text-primary': menuItem.isActive,
              'text-black':
                someChildrenIsActive(menuItem) && !menuItem.isActive,
              'text-gray-700':
                !menuItem.isActive && !someChildrenIsActive(menuItem),
            }"
          />
          <span
            v-if="!isCollapsed"
            class="mx-2"
            :class="{
              'hover:bg-gray-200 group-hover:text-primary-600':
                !menuItem.isActive && !someChildrenIsActive(menuItem),
              'gx-menu-item--active font-bold': menuItem.isActive,
            }"
          >
            {{ menuItem.title }}
          </span>
          <span
            v-if="isCollapsed"
            class="hidden px-2 text-center text-black bg-white rounded shadow-3 de:gx-caption group-hover:block "
            style=" position: absolute; left: 47px; min-width:4.4rem; white-space: nowrap;"
          >
            {{ menuItem.title }}
          </span>
          <GxIcon
            class="flex justify-end flex-grow"
            v-if="menuItem.children"
            :class="{ 'group-hover:text-primary-600': !menuItem.isActive }"
            :icon="
              menuItem.isActive || someChildrenIsActive(menuItem)
                ? 'keyboard_arrow_up'
                : 'keyboard_arrow_right'
            "
          />
        </div>
        <transition name="slide">
          <div v-if="menuItem.isActive || someChildrenIsActive(menuItem)">
            <template>
              <li
                v-for="submenuItem in menuItem.children"
                :key="submenuItem.title"
                class="relative py-2 hover:bg-gray-200"
                :class="{
                  'hover:bg-gray-100 hover:text-primary-600': !someChildrenIsActive(
                    submenuItem
                  ),
                  'text-gray-700': !someChildrenIsActive(submenuItem),
                  'gx-submenu-item--active text-secondary': someChildrenIsActive(
                    submenuItem
                  ),
                }"
              >
                <RouterLink
                  class="flex items-center gx-menu-item group gx-submenu-item"
                  :class="{
                    'gx-submenu-item--collapsed': isCollapsed,
                    'justify-center': isCollapsed,
                    'gx-submenu-item--active': someChildrenIsActive(
                      submenuItem
                    ),
                  }"
                  :to="submenuItem.to"
                >
                  <GxIcon
                    :class="{
                      'ml-8': !isCollapsed,
                      'mr-2': !isCollapsed,
                      'rounded-full text-white': submenuItem.iconRounded,
                      'text-primary': someChildrenIsActive(submenuItem),
                      'bg-gray-500 group-hover:bg-secondary':
                        submenuItem.iconRounded &&
                        !someChildrenIsActive(submenuItem),
                      'bg-primary':
                        submenuItem.iconRounded &&
                        someChildrenIsActive(submenuItem),
                    }"
                    :icon="submenuItem.icon"
                  />
                  <span
                    v-if="!isCollapsed"
                    :class="{
                      'text-black font-bold': someChildrenIsActive(submenuItem),
                    }"
                    >{{ submenuItem.title }}</span
                  >
                  <span
                    v-if="isCollapsed"
                    class="hidden px-2 text-center text-black bg-white rounded shadow-3 de:gx-caption group-hover:block"
                    style=" position: absolute; left: 48px; min-width: 4.5rem; white-space: nowrap;"
                  >
                    {{ submenuItem.title }}
                  </span>
                </RouterLink>
              </li>
            </template>
          </div>
        </transition>
      </li>
    </template>
  </ul>
</template>
<style lang="scss" scoped>
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

.gx-menu-item {
  // height: 0.625rem;
  line-height: 0.75rem;
}
.gx-menu-item--active > i:first-of-type {
  position: relative;
}
.gx-menu-item--active > i:first-of-type::before {
  position: absolute;
  left: -16px;
  width: 4px;
  height: 100%;
  content: ' ';
  border-left: 4px solid var(--primary);
}
.gx-submenu-item--active > i:first-of-type {
  position: relative;
}
.gx-submenu-item--active > i:first-of-type::before {
  position: absolute;
  left: -32px;
  width: 4px;
  height: 100%;
  content: ' ';
  border-left: 4px solid var(--primary);
}
.gx-submenu-item--active.gx-submenu-item--collapsed > i:first-of-type::before {
  left: -16px;
}
.gx-menu-item--active.gx-is-collapsed {
  // left: -8px;
  // padding-left: 12px;
}
.gx-submenu-item--active {
  color: var(--secondary);
}
// .gx-submenu-icon-mobile {
//   position: absolute;
//   top: 5px;
//   left: 30px;
// }
// .gxArrowRight {
//   top: 24%;
//   right: 40%;
// }
// .gxArrowDown {
//   top: 8px;
//   right: 40%;
// }
</style>
