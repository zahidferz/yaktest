<script>
export default {
  name: 'SignupNumberOfAccounts',
  data() {
    return {
      numberOfAccounts: '',
      hasFocus: null,
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
      // const gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      // gxSignup.body.user.lastName = this.lastname.trim()
      // localStorage.setItem('gxSignup', JSON.stringify(gxSignup))
      this.$router.push({ name: 'signupProblemToSolve' })
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
      >¿Cuántas contabilidades lleva tu despacho?</p
    >
    <GxForm class="flex w-full" @submit="onSubmit">
      <GxTextFieldDarkNumeric
        v-model="numberOfAccounts"
        required
        class="mr-4"
        label="Número de contabilidades"
        assistive=" "
        autofocus
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
      <div>
        <GxButtonCircle
          dark
          icon="arrow_forward"
          label="Guardar"
          type="submit"
        />
      </div>
    </GxForm>
  </div>
</template>
