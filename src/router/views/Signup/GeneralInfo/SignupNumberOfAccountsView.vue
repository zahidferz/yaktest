<script>
import Layout from '@layouts/LayoutMain'
import SignupNumberOfAccounts from '@components/Signup/GeneralInfo/SignupNumberOfAccounts'

export default {
  page: {
    title: 'Cuéntanos de tu despacho',
    meta: [{ name: 'description', content: 'Cuéntanos de tu despacho' }],
  },
  components: { Layout, SignupNumberOfAccounts },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupNumberOfAccounts />
  </Layout>
</template>
