<script>
export default {
  name: 'GxHelpTag',
  components: {},
  props: {
    icon: {
      type: String,
      default: 'help',
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      openModal: false,
    }
  },
  watch: {
    openModal(newVal) {
      if (newVal) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    },
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.openModal = false
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto'
  },
  methods: {
    onClick(evt) {
      if (evt.target === this.$refs.modalContainer) {
        this.openModal = false
      }
    },
    onClose() {
      this.openModal = false
    },
  },
}
</script>
<template>
  <div class="flex items-center">
    <i
      class="cursor-pointer material-icons-round sm:hover:text-primary active:text-primary iconSize"
      @click="openModal = true"
      >{{ icon }}</i
    >
    <Portal v-if="openModal" to="modal">
      <div
        class="fixed inset-x-0 inset-y-0 flex items-center justify-center w-screen h-screen"
      >
        <div class="absolute w-screen h-screen bg-black opacity-75"> </div>
        <div
          ref="modalContainer"
          class="absolute flex items-center justify-center w-full h-full p-4 overflow-auto sm:max-w-2xl"
          @click="onClick"
        >
          <div class="flex flex-col items-center rounded-lg modal">
            <GxButtonCircle
              class="self-end mt-2 mr-2 text-primary"
              icon="close"
              transparent
              @click="onClose"
            />
            <p class="px-4 pb-4 text-center text-black">{{ message }}</p>
          </div>
        </div>
      </div>
    </Portal>
  </div>
</template>
<style lang="scss" scoped>
.iconSize {
  font-size: 1rem;
}
.modal {
  width: 100%;
  background: var(--white);
}
</style>
