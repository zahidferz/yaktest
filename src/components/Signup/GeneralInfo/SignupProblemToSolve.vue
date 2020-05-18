<script>
import GxTextArea from '@components/_Core/Forms/GxTextArea'

export default {
  name: 'SignupNumberOfAccounts',
  components: {
    GxTextArea,
  },
  data() {
    return {
      problemToSolve: '',
      hasFocus: null,
      loading: false,
    }
  },
  created() {
    // if (localStorage.gxSignup) {
    //   this.user = JSON.parse(localStorage.getItem('gxSignup')).body.user
    //   this.lastname = this.user.lastName
    // } else {
    //   this.$router.push({ name: 'signupName' })
    // }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      this.loading = true
      // const gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      // gxSignup.body.user.lastName = this.lastname.trim()
      // localStorage.setItem('gxSignup', JSON.stringify(gxSignup))
      this.$router.push({ name: 'signupAccountCompleted' })
    },
  },
}
</script>
<template>
  <div
    class="flex flex-col flex-grow p-4 de:p-0"
    :class="{
      'justify-between': !(hasFocus && $utils.isIphone),
      'justify-end': hasFocus && $utils.isIphone,
    }"
  >
    <p
      class="text-center text-white gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >¿Cual es el principal problema que quieres resolver con Taxes?</p
    >
    <GxForm class="w-full" @submit="onSubmit">
      <div class="block">
        <GxTextArea
          required
          v-model="problemToSolve"
          label=""
          placeholder="Escribe aquí..."
          class="px-3"
        />
      </div>

      <div
        class="flex flex-col items-center content-center flex-grow block mt-5"
      >
        <GxButton
          type="submit"
          id="btn-layout-no"
          class="ml-3"
          label="INICIAR"
          dark
          :loading="loading"
          >INICIAR</GxButton
        >
      </div>
    </GxForm>
  </div>
</template>
