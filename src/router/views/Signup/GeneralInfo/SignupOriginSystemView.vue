<script>
import Layout from '@layouts/LayoutMain'
import SignupOriginSystem from '@components/Signup/GeneralInfo/SignupOriginSystem'

export default {
  page: {
    title: 'Cuéntanos de tu despacho',
    meta: [{ name: 'description', content: 'Cuéntanos de tu despacho' }],
  },
  components: { Layout, SignupOriginSystem },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupOriginSystem />
  </Layout>
</template>
