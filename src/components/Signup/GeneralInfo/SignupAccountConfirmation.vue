<script>
import gql from 'graphql-tag'
import { axiosAccountProvisioning } from '@/src/axiosConfig.js'
import ConfirmationCodeForm from '@components/Signup/GeneralInfo/ConfirmationCodeForm'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'

export default {
  name: 'SignupAccountConfirmation',
  components: {
    ConfirmationCodeForm,
    GxCardModal,
  },
  apollo: {
    myAccount: {
      query: gql`
        {
          myAccount {
            email
            userSecurityStatus
            mobilePhone
            companies {
              status
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
    },
  },
  data() {
    return {
      loading: false,
      code: '',
      confirmationSucces: false,
      error: false,
      sendingCode: false,
      customMessage: '',
      serverError: null,
    }
  },
  computed: {
    guest() {
      if (this.myAccount) {
        return this.myAccount.companies.some(
          (company) => company.status === 'invited'
        )
      }
      return false
    },
    formattedNumber() {
      //return '5530202464'.replace(/(\d{2})(\d{4})(\d{4}\d*)/, '$1 $2 $3')
      if (this.myAccount && this.myAccount.mobilePhone) {
        // Transforms 5530202464 into 55 3020 2464
        return this.myAccount.mobilePhone.replace(
          /(\d{2})(\d{4})(\d{4}\d*)/,
          '$1 $2 $3'
        )
      }
      return null
    },
  },
  watch: {
    myAccount(newVal) {
      if (newVal && newVal.userSecurityStatus) {
        if (newVal.userSecurityStatus === 'secured') {
          //this.$router.push({ name: 'signupAccountingInformation' })
        }
      }
    },
    code(newVal) {
      this.error = false
      if (newVal && newVal.length === 4 && !this.loading) {
        this.confirmCode(this.code)
      }
    },
  },
  mounted() {
    const pasteHandler = (evt) => {
      this.code = (evt.clipboardData || window.clipboardData).getData('text')
    }
    document.addEventListener('paste', pasteHandler, true)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('paste', pasteHandler)
    })
  },
  methods: {
    parseValue(val) {
      return val.replace(/\D/g, '')
    },
    sendCode(email) {
      return axiosAccountProvisioning.post('resend_code', {
        email,
      })
    },
    async resendCode() {
      try {
        this.sendingCode = true
        await this.sendCode(this.myAccount.email)
        this.error = false
        this.code = ''
        this.customMessage = 'Código reenviado'
      } catch (error) {
        this.serverError = this.$utils.parseServerError(error)
      } finally {
        this.sendingCode = false
      }
    },
    validateCode(code, email) {
      return axiosAccountProvisioning.post('handle_user_confirmation', {
        confirmationCode: code,
        email,
      })
    },
    async confirmCode(code) {
      if (!this.myAccount || !this.myAccount.email) return
      try {
        this.loading = true
        const email = this.myAccount.email
        await this.validateCode(code, email)
        if (this.guest) {
          this.$router.push({ name: 'guest' })
        } else {
          this.confirmationSucces = true
          if (this.$mq === 'de')
            this.$router.push({ name: 'signupAccountingInformation' })
          else this.$router.push({ name: 'signupAccountConfirmed' })
        }
      } catch (error) {
        const errorMessage = this.$utils.parseServerError(error)
        if (errorMessage === 'Código de verificación inválido') {
          this.error = true
          this.customMessage = ''
        } else {
          // Unknown error. Backend may be down
          this.serverError =
            typeof errorMessage === 'string' && errorMessage.length
              ? errorMessage
              : error.message
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<template>
  <div
    class="flex flex-col flex-grow px-4 mt-4 de:mt-0 de:justify-center de:items-center body-gradients"
  >
    <div
      class="flex-col de:shadow-3 de:pt-8 de:px-8 de:pb-8 de:bg-white de:rounded"
    >
      <p v-if="$mq === 'de'" class="text-2xl font-bold text-center"
        >Confirma tu cuenta</p
      >
      <p class="text-xs text-white de:tracking-normal de:text-black de:mt-4"
        >Ingresa el código que enviamos a
        <span class="font-bold whitespace-no-wrap">{{ formattedNumber }}</span>
        para confirmar tu cuenta.</p
      >
      <p
        class="flex flex-col items-center mt-8 text-xs text-white de:items-start de:mt-4 de:text-black"
        >Código de confirmación</p
      >
      <div class="flex flex-col items-center justify-center flex-grow">
        <!-- mx-auto mt-2 -->
        <div
          style="width: min-content"
          class="flex flex-col items-center mx-auto mt-2"
        >
          <ConfirmationCodeForm
            v-model="code"
            :error="error"
            :disabled="loading"
            :custom-message="customMessage"
          />
        </div>

        <p
          v-if="$mq === 'mo'"
          class="pt-4 pb-10 pl-8 pr-8 text-xs text-center text-white"
          >Confirmar tu cuenta significa que aceptas los
          <GxTextLink
            class="text-xs underline"
            :to="{ name: 'termsandconditions' }"
          >
            Términos y condiciones
          </GxTextLink>
          de Taxes.</p
        >

        <p
          class="text-xs tracking-normal text-center text-white de:text-black de:mt-10"
        >
          <label v-if="$mq === 'de'">
            ¿Ya pasó un minuto y aún no recibes el código?
          </label>
          <label v-else class="text-center">
            ¿Ya pasó un minuto y aún no no lo recibes?
          </label>
          <GxTextLink
            class="text-xs text-white underline de:text-secondary de:no-underline"
            type="button"
            @click.prevent="resendCode"
          >
            Reenviar el código
          </GxTextLink></p
        >
      </div>
    </div>
    <p
      v-if="$mq === 'de'"
      class="mt-5 text-xs tracking-normal text-center text-white"
      >Confirmar tu cuenta significa que aceptas los <br />
      <GxTextLink :to="{ name: 'termsandconditions' }">
        Términos y condiciones
      </GxTextLink>
      de Taxes.</p
    >
    <GxCardModal
      v-if="serverError"
      :headline="serverError"
      :card-img="$utils.alertImages.Oops"
      alt="Error"
      delayAnimation
    />
  </div>
</template>
