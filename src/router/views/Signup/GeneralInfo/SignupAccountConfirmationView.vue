<script>
import Layout from '@layouts/LayoutMain'
import SignupAccountConfirmation from '@components/Signup/GeneralInfo/SignupAccountConfirmation'

export default {
  page: {
    title: 'Confirma tu cuenta',
    meta: [{ name: 'description', content: 'Confirma tu cuenta' }],
  },
  components: {
    Layout,
    SignupAccountConfirmation,
  },
}
</script>

<template>
  <Layout :title="$mq === 'mo' ? 'Confirma tu cuenta' : null">
    <a v-if="$mq === 'de'" href="#" class="fixed top-0 left-0 mt-8 ml-8 "
      ><figure>
        <img
          class="w-41"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupAccountConfirmation />
  </Layout>
</template>
