<script>
import Layout from '@layouts/LayoutMain'
import SignupOriginSystemOptions from '@components/Signup/GeneralInfo/SignupOriginSystemOptions'

export default {
  page: {
    title: 'Cuéntanos de tu despacho',
    meta: [{ name: 'description', content: 'Cuéntanos de tu despacho' }],
  },
  components: { Layout, SignupOriginSystemOptions },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupOriginSystemOptions />
  </Layout>
</template>
