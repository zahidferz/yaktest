<script>
import { axiosAccountProvisioning } from '@src/axiosConfig'
import authService from '@src/auth/authService'
import { getAttributions } from '@src/utms'
import CountryCodeDropdownDe from '@components/Signup/GeneralInfo/CountryCodeDropdownDe'
export default {
  name: 'SignupName',
  components: {
    CountryCodeDropdownDe,
  },
  data() {
    return {
      createAccountError: null,
      hasFocus: false,
      name: '',
      lastname: '',
      userEmail: '',
      phone: '',
      guest: false,
      password: '',
      loading: false,
      buttonText: '',
      countryCallingCode: '+52',
      loadingSuccess: false,
    }
  },
  computed: {
    attributions() {
      return getAttributions()
    },
    createAccountBody() {
      const {
        utms,
        whereArrives,
        whereItComesFrom,
        elementWhereRegisters,
        whereRegisters,
      } = this.attributions
      return {
        user: {
          // WARNING: We must not store password on localStorage!
          email: this.userEmail,
          firstName: this.name.trim(),
          lastName: this.lastname.trim(),
          countryCallingCode: this.countryCallingCode,
          mobilePhone: this.phone.replace(/\D/gi, ''),
          password: this.password,
          // WARNING: We must not store password on localStorage!
        },
        subscription: {
          createdBy: this.userEmail,
          attribution: {
            utmSource: utms.utmSource,
            utmMedium: utms.utmMedium,
            utmCampaign: utms.utmCampaign,
            utmContent: utms.utmContent,
            utmTerm: utms.utmTerm,
            utmMatchtype: utms.utmMatchtype,
          },
          urls: {
            whereItComesFrom,
            whereArrives,
            whereRegisters,
            elementWhereRegisters,
          },
        },
      }
    },
    createGuestBody() {
      return this.createAccountBody.user
    },
  },
  watch: {
    createAccountBody() {
      this.createAccountError = ''
    },
  },
  created() {
    if (localStorage.gxSignup)
      this.name = JSON.parse(localStorage.gxSignup).body.user.firstName
    if (this.$route.query.invitationCode) {
      this.buttonText = 'Unirme Ahora'
    } else {
      this.buttonText = 'Crear cuenta'
    }
  },
  mounted() {
    // Extract signup data for totalpay accounts from query params
    // The link is provided to the users for faster acc. creation
    this.captureTotalplayQueryParams()

    if (this.$route.query.cn && this.$route.query.cn === 'false') {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    saveGxSignup(body, invitationCode) {
      localStorage.setItem(
        'gxSignup',
        JSON.stringify({
          body,
          invitationCode: invitationCode || null,
        })
      )
    },
    toLogin() {
      this.$router.push({ name: 'login' })
    },
    goBack() {
      this.$router.back()
    },
    async onSubmit() {
      // Prevent loosing focus on submit ( only mobile)
      if (this.mq === 'mo') {
        this.$refs.GxTextFieldDarkName.setFocus()
      }
      try {
        // Mobile and Desktop validations PASSED. Submit.
        this.loading = true
        if (this.$mq === 'de') {
          await this.submitDesktop()
        } else {
          await this.submitMobile()
        }
      } catch (error) {
        this.createAccountError = this.$utils.parseServerError(error)
      } finally {
        this.loading = false
        this.loadingSuccess = false
      }
    },
    captureTotalplayQueryParams() {
      // Totalplay specific params
      // tp: Is a totalplay account (true)
      // fn: first name
      // ln: last name
      // e: email
      // p: phone
      // tax: taxId
      const { tp, fn, ln, e, p, tax } = this.$route.query
      if (tp) {
        this.name = fn
        this.lastname = ln
        // '+' is encoded as white space 'email+1@email' could be encoded as 'email 1@gmail.com'
        this.userEmail = e.replace(' ', '+')
        this.phone = p
        this.taxId = tax

        // Add to localstorage for mobile signup
        this.saveGxSignup(
          this.createAccountBody,
          this.$route.query.invitationCode
        )
      }
    },
    async submitMobile() {
      const gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      let body
      if (gxSignup) {
        body = {
          user: {
            ...gxSignup.body.user,
            firstName: this.createAccountBody.user.firstName,
          },
          subscription: this.createAccountBody.subscription,
        }
      } else {
        body = this.createAccountBody
      }
      this.saveGxSignup(body, this.$route.query.invitationCode)
      this.$router.push({ name: 'signupLastname' })
    },
    async submitDesktop() {
      if (this.$route.query.invitationCode) {
        await this.createGuestDesktop()
      } else {
        await this.createUserDesktop()
      }
      localStorage.setItem(
        'redirectTo',
        JSON.stringify({ name: 'signupAccountConfirmation' })
      )
      // Authenticate against Auth0 to set cookies for account confirmation flow
      authService.login({
        email: this.userEmail,
        password: this.password,
      })
    },
    createUserDesktop() {
      return axiosAccountProvisioning.post(
        '/create_account',
        this.createAccountBody,
        {
          headers: {
            skipConfirmationMessage:
              !!window.Cypress ||
              this.userEmail.includes(
                process.env.VUE_APP_SKIP_CONFIRMATION_MESSAGE_STRING
              ),
          },
        }
      )
    },
    createGuestDesktop() {
      return axiosAccountProvisioning.post(
        '/create_account_from_invitation',
        this.createGuestBody,
        {
          headers: {
            invitationCode: this.$route.query.invitationCode,
          },
        }
      )
    },
  },
}
</script>
<template>
  <div class="flex flex-col justify-between flex-grow p-4 de:p-0">
    <!-- Mobile -->
    <MqLayout
      class="flex flex-col flex-grow"
      :class="{
        'justify-between': !(hasFocus && $utils.isIphone),
        'justify-end': hasFocus && $utils.isIphone,
      }"
      mq="mo"
    >
      <p
        class="text-center text-white gx-h3"
        :class="{
          'pb-0': hasFocus,
          'pb-4': !hasFocus,
          'mb-32': hasFocus && $utils.isIphone,
        }"
        style="transition: all .3s"
        >¡Hola! <br />
        ¿Cómo te llamas?</p
      >
      <GxForm class="flex w-full" @submit="onSubmit">
        <GxTextFieldDarkName
          ref="GxTextFieldDarkName"
          v-model="name"
          required
          class="mr-4 tex t- black"
          label="Nombre"
          assistive=" "
          autofocus
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        />
        <div>
          <GxButtonCircle
            dark
            type="submit"
            icon="arrow_forward"
            label="Guardar"
          />
        </div>
      </GxForm>
    </MqLayout>
    <!-- Desktop -->
    <MqLayout
      class="flex flex-col items-center justify-center flex-grow overflow-hidden body-gradients"
      mq="de"
    >
      <div class="flex justify-center z-2 ">
        <div class="mx-auto mt-8">
          <div class="flex flex-col p-8 bg-white rounded-lg shadow-3 z-1 w-108">
            <p class="font-bold text-center de:gx-h4 de:mb-2">¡Hola!</p>
            <GxForm
              class="z-10 flex flex-col w-full form"
              autocomplete="off"
              @submit="onSubmit"
            >
              <GxTextFieldName
                v-model="name"
                required
                label="Nombre *"
                autofocus
                left-icon="face"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <GxTextFieldName
                v-model="lastname"
                required
                left-icon="face"
                label="Apellido *"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <GxTextFieldEmail
                v-model="userEmail"
                required
                :disabled="guest"
                label="Correo Electrónico *"
                :for-id="`email_cuenta_nueva${Date.now()}`"
                :name="`email_cuenta_nueva${Date.now()}`"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <div class="flex items-start">
                <CountryCodeDropdownDe
                  v-model="countryCallingCode"
                  class="mr-4"
                />
                <GxTextFieldPhone
                  v-model="phone"
                  required
                  left-icon="phone_iphone"
                  label="Celular *"
                  @focus="hasFocus = true"
                  @blur="hasFocus = false"
                />
              </div>
              <!-- Use autocomplete new-password to prompt Chrome to autosuggest a strong password to the user -->
              <GxTextFieldPassword
                v-model="password"
                required
                class="mr-4 z-1"
                label="Contraseña *"
                for-id="contraseña_cuenta_nueva"
                name="contraseña_cuenta_nueva"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <div
                class="z-10 flex flex-col items-center justify-center de:mt-8"
              >
                <p
                  v-if="createAccountError"
                  class="mb-2 text-center text-alert"
                  >{{ createAccountError }}</p
                >
                <GxButton
                  type="submit"
                  :loading="loading"
                  :loading-success="loadingSuccess"
                >
                  {{ buttonText }}
                </GxButton>
              </div>
            </GxForm>
            <p class="z-10 text-center de:gx-caption"
              >¿Ya tienes una cuenta?
              <GxTextLink
                class="mb-4 text-center text-secondary"
                :to="{ name: 'login' }"
                >Inicia sesión</GxTextLink
              ></p
            >
          </div>
        </div>
      </div>
    </MqLayout>
  </div>
</template>
