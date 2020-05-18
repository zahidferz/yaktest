<script>
import InternationalPhone from '@components/Signup/GeneralInfo/InternationalPhone'
export default {
  name: 'SignupPhone',
  components: {
    InternationalPhone,
  },
  data() {
    return {
      // Default Mexico
      gxSignup: null,
      phoneData: {
        phone: '',
        countryCode: '+52',
      },
      user: null,
      hasFocus: false,
    }
  },
  computed: {
    phone() {
      if (this.phoneData) {
        return this.phoneData.phone
      }
      return ''
    },
    countryCode() {
      if (this.phoneData) {
        return this.phoneData.countryCode
      }
      return ''
    },
    firstName() {
      if (!this.user) return ''
      return this.user.firstName
    },
  },
  created() {
    if (localStorage.gxSignup) {
      this.gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      this.user = this.gxSignup.body.user
      this.phoneData.phone = this.user.mobilePhone
      this.phoneData.countryCode = this.user.countryCallingCode
    } else {
      this.$router.push({ name: 'signupName' })
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      const user = {
        ...this.user,
        mobilePhone: this.phoneData.phone.trim(),
        countryCallingCode: this.phoneData.countryCode,
      }
      localStorage.setItem(
        'gxSignup',
        JSON.stringify({
          body: {
            user,
            subscription: this.gxSignup.body.subscription,
          },
          invitationCode: this.gxSignup.invitationCode,
        })
      )
      this.$router.push({
        name: 'signupPassword',
      })
    },
  },
}
</script>

<template>
  <div
    class="flex-grow flex flex-col items-center p-4 de:p-0"
    :class="{
      'justify-between': !(hasFocus && $utils.isIphone),
      'justify-end': hasFocus && $utils.isIphone,
    }"
  >
    <!-- Seems to require a first click to lose focus and a second click to actually work on mobile -->
    <!-- The double click makes this hack useless for a dummy back button -->
    <!-- <div
      v-if="hasFocus && $utils.isIphone"
      class="flex justify-start w-full mb-20"
    >
      <GxIcon
        icon="keyboard_backspace"
        style=" font-size: 24px;color: #fff;"
        @click="goBack"
      />
    </div> -->
    <p
      class="text-white text-center gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >¿Y tú teléfono <br />
      celular?</p
    >
    <div class="px-8"> </div>
    <div class="w-full flex">
      <GxForm class="w-full flex" @submit="onSubmit">
        <InternationalPhone
          v-model="phoneData"
          class="mr-4"
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        />
        <div>
          <GxButtonCircle
            dark
            label="Guardar"
            icon="arrow_forward"
            data-testid="phone"
            type="submit"
          />
        </div>
      </GxForm>
    </div>
  </div>
</template>
