<script>
import Layout from '@layouts/LayoutMain'
import SignupProblemToSolve from '@components/Signup/GeneralInfo/SignupProblemToSolve'

export default {
  page: {
    title: 'Cuéntanos de tu despacho',
    meta: [{ name: 'description', content: 'Cuéntanos de tu despacho' }],
  },
  components: { Layout, SignupProblemToSolve },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupProblemToSolve />
  </Layout>
</template>
