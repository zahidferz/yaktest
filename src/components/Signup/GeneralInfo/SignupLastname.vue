<script>
export default {
  name: 'SignupLastname',
  data() {
    return {
      lastname: '',
      user: null,
      hasFocus: null,
    }
  },
  created() {
    if (localStorage.gxSignup) {
      this.user = JSON.parse(localStorage.getItem('gxSignup')).body.user
      this.lastname = this.user.lastName
    } else {
      this.$router.push({ name: 'signupName' })
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      const gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      gxSignup.body.user.lastName = this.lastname.trim()
      localStorage.setItem('gxSignup', JSON.stringify(gxSignup))
      this.$router.push({ name: 'signupEmail' })
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col p-4 de:p-0"
    :class="{
      'justify-between': !(hasFocus && $utils.isIphone),
      'justify-end': hasFocus && $utils.isIphone,
    }"
  >
    <p
      v-if="user"
      class="text-white text-center gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >¿Cuáles son tus apellidos,
      <span class="capitalize"> {{ user.firstName }}</span
      >?</p
    >
    <GxForm class="w-full flex" @submit="onSubmit">
      <GxTextFieldDarkName
        v-model="lastname"
        required
        class="mr-4"
        left-icon="face"
        label="Apellidos"
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
