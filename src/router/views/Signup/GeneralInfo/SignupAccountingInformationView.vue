<script>
import Layout from '@layouts/LayoutMain'
import SignupAccountingInformation from '@components/Signup/GeneralInfo/SignupAccountingInformation'

export default {
  page: {
    title: 'Háblanos de tu despacho',
    meta: [{ name: 'description', content: 'Háblanos de tu despacho' }],
  },
  components: {
    Layout,
    SignupAccountingInformation,
  },
}
</script>

<template>
  <Layout :title="$mq === 'mo' ? 'Háblanos de tu despacho' : null">
    <a v-if="$mq === 'de'" href="#" class="fixed top-0 left-0 mt-8 ml-8 "
      ><figure>
        <img
          class="w-41"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupAccountingInformation />
  </Layout>
</template>
