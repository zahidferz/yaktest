<script>
export default {
  name: 'SignupAccountConfirmed',
  data() {
    return {
      customError: null,
      role: 'Contador',
    }
  },
  mounted() {
    window.addEventListener('keypress', this.validateKeyPressed)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keypress', this.validateKeyPressed)
    })
  },
  beforeMount() {
    const timeout = setTimeout(() => {
      this.redirectToAccountingInformation()
    }, 5000)

    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timeout)
    })
  },
  methods: {
    validateKeyPressed(e) {
      e.preventDefault()
      e.stopPropagation()
      if (e.charCode === 13 || e.charCode === 32)
        this.redirectToAccountingInformation()
    },
    redirectToAccountingInformation() {
      this.$router.push({ name: 'signupAccountingInformation' })
    },
  },
}
</script>

<template>
  <div
    tabindex="0"
    @click.capture="redirectToAccountingInformation"
    @keydown.enter.stop="redirectToAccountingInformation"
    class="flex flex-col flex-grow bg-black de:overflow-hidden"
  >
    <div
      tabindex="1"
      class="flex flex-col items-center p-4 ml-4 mr-4 bg-white rounded-lg mt-44 de:mt-8 de:p-8 de:mx-auto de:shadow-3 de:flex-grow-0 de:relative de:w-108 de:mt-64"
      @keydown.enter.stop="redirectToAccountingInformation"
    >
      <figure>
        <img
          class="w-44 h-44"
          src="@assets/images/DE/Login/de_002_bienvenido_temporal.svg"
          alt="CASHME"
      /></figure>
      <h1 class="mb-3 font-bold text-center de:gx-h4"
        >¡Tu cuenta está confirmada!</h1
      >
      <p class="mb-4 text-center"
        >¡Ahora cuéntanos del mejor despacho del mundo: ¡El tuyo!</p
      >
      <p v-if="customError">{{ customError }}</p>
      <div class="w-full text-right">
        <p v-if="$mq === 'mo'">
          <GxTextLink
            class="mb-4 font-bold text-primary"
            :to="{ name: 'dashboard' }"
            >CONTINUAR</GxTextLink
          ></p
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.image {
  width: 176px;
}

@screen de {
  .imageContainer {
    position: absolute;
    top: 85%;
    left: -45%;
  }
  .image {
    width: 120%;
  }
}
</style>
