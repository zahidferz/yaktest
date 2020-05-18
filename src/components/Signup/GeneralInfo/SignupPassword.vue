<script>
import authService from '@src/auth/authService'
import { axiosAccountProvisioning } from '@src/axiosConfig'
export default {
  name: 'SignupPassword',
  data() {
    return {
      password: '',
      invalidPassword: true,
      customError: '',
      gxSignup: null,
      user: null,
      loading: false,
      hasFocus: false,
    }
  },
  computed: {
    createAccountBody() {
      if (this.gxSignup) {
        return {
          user: {
            ...this.user,
            password: this.password,
          },
          subscription: {
            ...this.gxSignup.body.subscription,
            createdBy: this.user.email,
          },
        }
      }
      return null
    },
    createGuestBody() {
      if (this.createAccountBody) {
        return this.createAccountBody.user
      }
      return null
    },
  },
  watch: {
    password(val) {
      this.customError = ''
    },
  },
  created() {
    if (localStorage.gxSignup) {
      this.gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      this.user = this.gxSignup.body.user
    } else {
      this.$router.push({ name: 'signupName' })
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    createUserMobile() {
      return axiosAccountProvisioning.post(
        '/create_account',
        this.createAccountBody,
        {
          headers: {
            skipConfirmationMessage:
              !!window.Cypress ||
              this.user.email.includes(
                process.env.VUE_APP_SKIP_CONFIRMATION_MESSAGE_STRING
              ),
          },
        }
      )
    },
    createGuestMobile() {
      return axiosAccountProvisioning.post(
        '/create_account_from_invitation',
        this.createGuestBody,
        {
          headers: {
            invitationCode: this.gxSignup.invitationCode,
          },
        }
      )
    },
    async onSubmit() {
      try {
        if (this.loading) return
        this.loading = true
        if (this.gxSignup.invitationCode) {
          await this.createGuestMobile()
        } else {
          await this.createUserMobile()
        }
        localStorage.removeItem('gxSignup')
        localStorage.setItem(
          'redirectTo',
          JSON.stringify({ name: 'signupAccountConfirmation' })
        )
        // // Authenticate against Auth0 to set cookies for account confirmation flow
        authService.login({
          email: this.user.email,
          password: this.password,
        })
      } catch (err) {
        this.loading = false
        this.customError = this.$utils.parseServerError(err)
      }
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
      v-if="user"
      class="text-center text-white gx-transition-all gx-h3"
      :class="{
        'py-0': hasFocus,
        'py-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >Crea una contraseña<br />segura,
      <span class="capitalize">{{ user.firstName }}</span
      >.</p
    >
    <GxForm class="flex w-full" @submit="onSubmit">
      <GxTextFieldDarkPassword
        v-model="password"
        required
        class="mr-4"
        label="Contraseña"
        :disabled="loading"
        :error="customError"
        autofocus
        assistive=" "
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
      <div>
        <GxButtonCircle
          dark
          type="submit"
          label="Guardar"
          icon="arrow_forward"
          :loading="loading"
          :disabled="loading"
        />
      </div>
    </GxForm>
  </div>
</template>
<style lang="scss" scoped>
.gx-transition-all {
  transition: all 0.5s ease-in-out;
}
</style>
