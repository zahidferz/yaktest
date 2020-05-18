<script>
import authService from '@src/auth/authService'
import GxCardCore from '@components/_Core/Cards/GxCardCore'

export default {
  components: {
    GxCardCore,
  },
  data() {
    return {
      hasFocus: false,
      loading: false,
      userEmail: '',
      password: '',
      invalidPassword: true,
      invalidEmail: true,
      customErrorEmail: '',
      customErrorPassword: '',
      authError: null,
      bgImg: require('@src/assets/images/DE/Login/de_002_fondo.svg'),
      bgImgClouds: require('@src/assets/images/DE/Login/de_002_nubes.svg'),
      windowHeight: 'auto',
      urlWhereRegister: window.location.toString().split('?')[0],
      utmMedium: document.referrer || 'Directo Website',
    }
  },
  computed: {
    collapseImage() {
      return this.hasFocus && !this.$utils.isIphone
    },
  },
  watch: {
    password() {
      this.customErrorPassword = ''
    },
    userEmail() {
      this.customErrorEmail = ''
    },
  },
  mounted() {
    this.windowHeight = window.document.documentElement.clientHeight + 'px'
    const setImageHeight = () => {
      this.windowHeight = window.document.documentElement.clientHeight + 'px'
    }
    window.addEventListener('resize', setImageHeight)
    this.$once('hook:destroyed', () => {
      window.removeEventListener('resize', setImageHeight)
    })
  },
  methods: {
    toSignup() {
      this.$router.push({
        name: 'signup',
        query: {
          utm_source: 'Orgánico',
          utm_medium: this.utmMedium,
          url_dondeseregistra: this.urlWhereRegister,
          innerLink: true,
          url_elementoenelqueseregistra: 'btn-register-login',
        },
      })
    },
    getImage(selection) {
      this.imgSelection = selection.optionImg
      this.optionName = selection.optionName
    },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
    onSubmit() {
      // if (this.$mq === 'mo') {
      //   this.$refs.email.setFocus()
      // }
      // if (this.userEmail.length === 0 || this.password.length === 0) {
      //   this.customErrorEmail = 'Este campo es necesario'
      //   this.customErrorPassword = 'Este campo es necesario'
      // }
      // if (this.userEmail.length === 0) {
      //   this.customErrorEmail = 'Este campo es necesario'
      // } else {
      //   this.customErrorEmail = ''
      // }
      // if (this.password.length === 0) {
      //   this.customErrorPassword = 'Este campo es necesario'
      // } else {
      //   this.customErrorPassword = ''
      // }
      // if (this.invalidEmail || this.invalidPassword) {
      //   return
      // }
      // if (this.invalidPassword) return

      this.loading = true
      this.authError = null
      authService.login(
        {
          email: this.userEmail,
          password: this.password,
        },
        (err) => {
          this.loading = false
          this.authError = this.$utils.parseServerError(err)
          this.customErrorEmail = ' '
          this.customErrorPassword = ' '
        }
      )
    },
  },
}
</script>
<template>
  <div class="flex flex-col flex-grow">
    <!-- Mobile -->
    <MqLayout class="flex flex-col flex-grow bg-primary" mq="mo">
      <div
        class="overflow-x-hidden"
        :class="{ gxImageContainer: !collapseImage }"
      >
      </div>
      <div>
        <div
          id="borders"
          class="flex flex-col flex-grow p-4 bg-primary negative-margin formContainer rounded-t-xl"
        >
          <p class="mb-8 text-white">Bienvenido, ingresa tus datos</p>
          <GxForm class="flex flex-col flex-grow " @submit="onSubmit">
            <GxTextFieldDarkEmail
              v-model="userEmail"
              required
              autofocus
              :autofocus-timeout="1000"
              class="mb-4"
              label="Correo Electrónico"
              :error="customErrorEmail"
              for-id="email"
              name="email"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />

            <GxTextFieldDarkPassword
              v-model="password"
              required
              class="mb-4"
              label="Contraseña"
              :error="customErrorPassword"
              for-id="password"
              name="password"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />

            <p v-if="authError" class="mb-2 text-center text-white">
              {{ authError }}
            </p>
            <GxButton :loading="loading" class="mx-auto" dark type="submit"
              >Entrar</GxButton
            >
            <div class="flex justify-center w-full text-white">
              <GxTextLink
                :to="{
                  name: 'signup',
                  query: {
                    utm_source: 'Orgánico',
                    utm_medium: utmMedium,
                    url_dondeseregistra: urlWhereRegister,
                    url_elementoenelqueseregistra: 'btn-register-login',
                  },
                }"
                class="mr-1 font-bold"
                >Regístrate</GxTextLink
              >
              <span class="mr-1"> | </span>
              <GxTextLink :to="{ name: 'passwordrecovery' }" class="font-bold">
                Recuperar contraseña</GxTextLink
              >
            </div>
          </GxForm>
        </div>
      </div>
    </MqLayout>
    <!-- Desktop -->
    <MqLayout
      class="relative flex items-center flex-grow w-full overflow-hidden bg-no-repeat contentPosition"
      mq="de"
      :style="`background-image: url(${bgImg});background-position: right;`"
    >
      <div class="ml-8 formPosition">
        <GxCardCore
          :clickable="false"
          class="px-8 py-8 gxCardFormDesk shadow-3"
        >
          <p class="font-bold text-center de:gx-h4"
            >Bienvenido, inicia sesión</p
          >
          <GxForm class="mt-4" @submit="onSubmit">
            <GxTextFieldEmail
              v-model.trim="userEmail"
              required
              label="Correo Electrónico"
              :error="customErrorEmail"
              for-id="email"
              name="email"
              autofocus
              class="mb-2"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
              :validation-delay="5000"
            />

            <GxTextFieldPassword
              v-model="password"
              required
              label="Contraseña"
              :error="customErrorPassword"
              for-id="password"
              name="password"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />

            <p class="mt-8 mb-2 text-center text-alert"> {{ authError }} </p>
            <GxButton :loading="loading" class="mx-auto" type="submit"
              >Entrar</GxButton
            >
            <!-- type="submit" -->
          </GxForm>
          <div class="flex justify-center de:gx-caption">
            <p class="mr-1">
              ¿Aún no tienes cuenta?
            </p>
            <GxTextLink
              id="btn-register-login"
              class="text-secondary-300"
              @mousedown="toSignup"
            >
              Regístrate
            </GxTextLink>
            <span class="mx-1"> | </span>
            <GxTextLink
              class="text-secondary-300"
              :to="{ name: 'passwordrecovery' }"
            >
              Recuperar contraseña
            </GxTextLink>
          </div>
        </GxCardCore>
      </div>

      <img
        class="absolute flex-shrink pointer-events-none group-image z-1 astronaut w-172 h-172"
        style="right: 32px;"
        src="@src/assets/images/DE/Login/de_002_bienvenido_temporal.svg"
        alt=""
      />
      <!-- </div> -->
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.formContainer {
  transform: translateY(-14px);
}
.gxImageContainer {
  // Padding hack https://css-tricks.com/scale-svg/
  width: 100%;
  padding-bottom: calc(80% * 244 / 360);
  margin-top: 0.15rem;
  background-image: url(~@assets/images/Login/mo_002_bienvenido.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: initial;
  transition: all 0.2s ease-in-out;
}
.gxCardFormDesk {
  width: 27rem;
}
.contentPosition {
  background-size: 71% 100%;
}

@media only screen and (max-width: 1000px) {
  .group-image {
    display: none;
  }
  .contentPosition {
    justify-content: center;
    background-size: 50% 100%;
  }
}

@media only screen and (min-width: 1035px) {
  .astronaut {
    width: 40%;
    padding-bottom: 4rem;
  }
  .formPosition {
    padding-left: 5%;
  }
  .stars {
    width: 48%;
  }
  .moon {
    width: 8%;
  }
}
</style>
