<script>
import Layout from '@layouts/LayoutMain'
import SignupAccountCompleted from '@components/Signup/GeneralInfo/SignupAccountCompleted.vue'

export default {
  page: {
    title: 'Confirmación de cuenta',
    meta: [{ name: 'description', content: 'Confirmación de cuenta' }],
  },
  components: { Layout, SignupAccountCompleted },
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
    <SignupAccountCompleted />
  </Layout>
</template>
