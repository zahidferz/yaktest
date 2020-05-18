<script>
export default {
  name: 'GxSnackbar',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  created() {
    this.timeout = setTimeout(() => {
      this.$emit('close')
    }, 5000)
    this.$once('hook:beforeDestroy', () => {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    })
  },
}
</script>
<template>
  <Portal to="modal">
    <transition name="fade" appear>
      <div
        style="top:50vh;width:350px;transition:translateY(-50%)"
        class="rounded-lg bg-gray-700 fixed z-50  left-0 right-0 my-auto mx-auto"
      >
        <slot>
          <p class="text-white text-sm text-center p-4 tracking-normal">
            {{ message }}
          </p>
        </slot>
      </div>
    </transition>
  </Portal>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
