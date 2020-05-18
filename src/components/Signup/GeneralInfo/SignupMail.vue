<script>
export default {
  name: 'SignupMail',
  data() {
    return {
      userEmail: '',
      invalidEmail: true,
      loading: false,
      customError: '',
      gxSignup: null,
      hasFocus: false,
    }
  },
  computed: {
    createAccountBody() {
      if (this.gxSignup) {
        return {
          user: {
            ...this.user,
            email: this.userEmail,
          },
          subscription: this.gxSignup.body.subscription,
        }
      }
      return null
    },
  },
  watch: {
    userEmail(val) {
      this.customError = ''
    },
  },
  created() {
    if (localStorage.gxSignup) {
      this.gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      this.user = this.gxSignup.body.user
      this.userEmail = this.user.email
    } else {
      this.$router.push({ name: 'signupName' })
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async onSubmit() {
      try {
        this.loading = true
        localStorage.setItem(
          'gxSignup',
          JSON.stringify({
            body: this.createAccountBody,
            invitationCode: this.gxSignup.invitationCode,
          })
        )
        this.$router.push({ name: 'signupPhone' })
        this.loading = false
      } catch (error) {
        this.customError = this.$utils.parseServerError(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col items-center p-4 de:p-0 items-center"
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
      >¡<span class="capitalize">{{ user.firstName }}</span
      >!<br />
      ¿Cuál es tu correo electrónico?</p
    >
    <GxForm class="w-full flex" @submit="onSubmit">
      <GxTextFieldDarkEmail
        v-model="userEmail"
        :error="customError"
        class="mr-4"
        label="Correo Electrónico"
        :disabled="loading"
        assistive=" "
        autofocus
        required
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
      <div>
        <GxButtonCircle
          icon="arrow_forward"
          label="Guardar"
          dark
          type="submit"
          data-testid="mail"
          :loading="loading"
          :disabled="loading"
        />
      </div>
    </GxForm>
  </div>
</template>
