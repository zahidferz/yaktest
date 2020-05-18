<script>
import { axiosAccountProvisioning } from '@src/axiosConfig'
import gql from 'graphql-tag'
import get from 'lodash/get'
const _ = {
  get,
}
export default {
  name: 'SignupAccountCompleted',
  data() {
    return {
      customError: null,
      role: 'Contador',
    }
  },
  apollo: {
    myAccount: gql`
      {
        myAccount {
          userNumber
          companies {
            company {
              companyNumber
            }
          }
        }
      }
    `,
  },
  mounted() {
    window.addEventListener('keypress', this.validateKeyPressed)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keypress', this.validateKeyPressed)
    })
  },
  beforeMount() {
    const timeout = setTimeout(() => {
      this.redirectToDashboard()
    }, 5000)

    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timeout)
    })
  },
  methods: {
    validateKeyPressed(e) {
      e.preventDefault()
      e.stopPropagation()
      if (e.charCode === 13 || e.charCode === 32) this.redirectToDashboard()
    },
    redirectToDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
    pickRole(role) {
      this.$apollo.mutate({
        mutation: UPDATE_USER_JOBTITLE,
        variables: {
          jobTitle: role,
        },
      })
      this.loading = true
      axiosAccountProvisioning
        .post(
          `/update_account/${this.myAccount.userNumber}/${this.myAccount.companies[0].company.companyNumber}`,
          {
            user: {
              jobTitle: role,
            },
          }
        )
        .then((res) => {
          //this.loading = false
          this.$router.push({
            name: `dashboard`,
            query: {
              invitado: true,
            },
          })
        })
        .catch((err) => {
          //this.loading = false
          this.customError = _.get(
            err,
            'response.data.message',
            'Hubo un error'
          )
        })
    },
  },
}
</script>

<template>
  <div
    tabindex="0"
    @click.capture="redirectToDashboard"
    @keydown.enter.stop="redirectToDashboard"
    class="flex flex-col flex-grow bg-black de:overflow-hidden"
  >
    <div
      tabindex="1"
      class="flex flex-col items-center p-4 ml-4 mr-4 bg-white rounded-lg mt-44 de:mt-8 de:p-8 de:mx-auto de:shadow-3 de:flex-grow-0 de:relative de:w-108 de:mt-64"
      @keydown.enter.stop="redirectToDashboard"
    >
      <figure>
        <img
          class="w-44 h-44"
          src="@assets/images/DE/Login/de_002_bienvenido_temporal.svg"
          alt="CASHME"
      /></figure>
      <h1 class="mb-3 font-bold text-center de:gx-h4"
        >En sus marcas,listos, ¡fuera!</h1
      >
      <p class="mb-4 text-center"
        >¡Es momento de llevar la contabilidad a la velocidad de la luz!</p
      >
      <p v-if="customError">{{ customError }}</p>
      <div class="w-full text-right">
        <p v-if="$mq === 'mo'">
          <GxTextLink
            class="mb-4 font-bold text-primary"
            :to="{ name: 'dashboard' }"
            >VAMOS</GxTextLink
          ></p
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.image {
  width: 176px;
}

@screen de {
  .imageContainer {
    position: absolute;
    top: 85%;
    left: -45%;
  }
  .image {
    width: 120%;
  }
}
</style>
