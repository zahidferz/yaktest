<script>
export default {
  name: 'SignupOriginSystem',
  data() {
    return {
      user: null,
      hasFocus: null,
      loading: false,
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToOriginOptions() {
      console.log(
        '####### Bloque de codigo pendiente en SignupOriginSystem.vue metodo goToOriginOptions ######'
      )
      this.$router.push({ name: 'signupOriginSystemOptions' })
    },
    onSubmit() {
      // const gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      // gxSignup.body.user.lastName = this.lastname.trim()
      // localStorage.setItem('gxSignup', JSON.stringify(gxSignup))
      this.loading = true
      console.log(
        '####### Bloque de codigo pendiente en SignupOriginSystem.vue metodo onSubmit ######'
      )
      this.$router.push({ name: 'signupNumberOfAccounts' })
    },
  },
}
</script>
<template>
  <div
    class="flex flex-col flex-grow p-4 de:p-0"
    :class="{
      'justify-between': !hasFocus,
      'justify-end': hasFocus,
    }"
  >
    <p
      class="text-center text-white gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus,
      }"
      >¿Vienes de otro sistema contable?</p
    >
    <div class="flex w-full">
      <div class="flex items-center justify-center flex-grow text-center ">
        <GxButton
          v-show="!loading"
          id="btn-layout-yes"
          class="mr-3"
          label="Si"
          dark
          @click.prevent="goToOriginOptions"
          >SI</GxButton
        >

        <GxButton
          id="btn-layout-no"
          class="ml-3"
          label="No"
          dark
          :loading="loading"
          @click.prevent="onSubmit"
          >NO</GxButton
        >
      </div>
    </div>
  </div>
</template>
