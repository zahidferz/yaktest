<script>
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import MenuProfile from '@components/Profile/MenuProfile'
export default {
  name: 'ProfileIcon',
  components: { GxAvatar, MenuProfile },
  props: {
    activeMenu: {
      type: String,
      default: null,
    },
    myAccount: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showPopover: false,
    }
  },
  computed: {
    showSection() {
      return this.activeMenu === this.$options.name
    },
    label() {
      if (this.quantity) {
        const number = Number(this.quantity)
        return number > 99 ? '+99' : number
      }
      return null
    },
    stringlength() {
      if (this.quantity) {
        return String(this.quantity).length
      }
      return null
    },
    initials() {
      if (
        this.myAccount &&
        this.myAccount.firstName &&
        this.myAccount.lastName
      ) {
        return (
          this.myAccount.firstName[0] + this.myAccount.lastName[0]
        ).toUpperCase()
      }
      return ''
    },
  },
  methods: {
    showHideMenu() {
      if (!this.showSection) {
        this.$emit('activeMenu', this.$options.name)
      } else {
        this.$emit('activeMenu', null)
      }
    },
  },
}
</script>
<template>
  <div
    class="relative text-base outline-none focus:outline-none"
    @click.stop="showHideMenu"
  >
    <div class="flex items-center cursor-pointer">
      <GxAvatar
        v-if="myAccount && (!myAccount.image || myAccount.image === 'NULL')"
        shape="miniAvatar"
        :class="[`bg-avatar-${myAccount.color}`]"
        class="font-bold text-white rounded-full"
        font-styles="font-size: .75rem; font-weight: 600;"
        style="width: 1.5rem; height: 1.5rem;"
      >
        {{ initials }}
      </GxAvatar>
      <GxAvatar
        v-if="myAccount && myAccount.image && myAccount.image !== 'NULL'"
        shape="miniAvatar"
        :avatar-img="myAccount.image"
        style="width: 1.5rem; height: 1.5rem;"
      />
    </div>
    <transition name="popover">
      <section
        v-if="showSection"
        class="absolute right-0 overflow-hidden text-base text-left text-black bg-white de:text-xs font-gothic w-70 shadow-5 popover de:pt-2"
        @click.stop
      >
        <MenuProfile @close="$emit('activeMenu', null)" />
      </section>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.popover {
  top: 2rem;
  border-radius: 8px 0 8px 8px;
  transform-origin: top right;
}
// Vue  animations
// .popover-enter-active {
//   transition: all 0.3s ease-out;
// }
// .popover-leave-active {
//   transition: all 0.3s ease-in;
// }
// .popover-enter,
// .popover-leave-to {
//   opacity: 0;
//   transform: translateY(-1rem) scale(0.1);
// }
// .popover-enter-to {
//   transform: scale(1);
// }
::-webkit-scrollbar {
  width: 8px;
}
</style>
