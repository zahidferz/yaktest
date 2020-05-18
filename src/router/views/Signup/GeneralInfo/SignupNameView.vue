<script>
import Layout from '@layouts/LayoutMain'
import SignupName from '@components/Signup/GeneralInfo/SignupName'

export default {
  page: {
    title: 'Registro',
    meta: [{ name: 'description', content: 'Registro' }],
  },
  components: { Layout, SignupName },
}
</script>

<template>
  <Layout
    :icon="$mq === 'mo' ? 'keyboard_backspace' : null"
    :dark="$mq === 'mo'"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed top-0 left-0 mt-8 ml-8"
      ><figure>
        <img
          class="w-41"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupName />
  </Layout>
</template>
