<script>
import Layout from '@layouts/LayoutMain'
import SignupAccountConfirmed from '@components/Signup/GeneralInfo/SignupAccountConfirmed.vue'

export default {
  page: {
    title: 'Cuenta confirmada',
    meta: [{ name: 'description', content: 'Cuenta confirmada' }],
  },
  components: { Layout, SignupAccountConfirmed },
}
</script>

<template>
  <Layout :title="null">
    <a v-if="$mq === 'de'" href="#" class="fixed top-0 left-0 mt-8 ml-8"
      ><figure>
        <img
          class="w-41"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupAccountConfirmed />
  </Layout>
</template>
