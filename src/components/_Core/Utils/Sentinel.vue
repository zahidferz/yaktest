<script>
export default {
  name: 'Sentinel',
  mounted() {
    const callback = (entries) => {
      const [sentinel] = entries
      if (!sentinel.isIntersecting) {
        this.$emit('hidden')
      } else {
        this.$emit('visible')
      }
    }
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    }
    this.observer = new IntersectionObserver(callback, options)
    this.observer.observe(this.$el)
    this.$once('hook:beforeDestroy', () => {
      this.observer.disconnect()
    })
  },
}
</script>
<template>
  <div style="height:1px"></div>
</template>
