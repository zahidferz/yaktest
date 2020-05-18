<script>
import Layout from '@layouts/LayoutMain'
export default {
  page: {
    title: 'Bienvenido',
    meta: [{ name: 'Página de inicio', content: 'Bienvenido' }],
  },
  components: {
    Layout,
  },
  data() {
    return {
      date: new Date().toISOString(),
      urlDondeseregistra: window.location.toString().split('?')[0],
      utmSource: document.referrer || 'Orgánico',
    }
  },
}
</script>

<template>
  <Layout dark>
    <div
      class="flex flex-col justify-between flex-grow p-8 pt-8 text-white body-gradients"
    >
      <div class="flex flex-col items-center pt-8 de:pt-0 de:items-start">
        <img src="@assets/images/Logos/white.svg" class="w-41" alt="Taxes!" />
      </div>
      <div
        class="flex flex-col items-center justify-center flex-grow text-center "
      >
        <GxButton
          id="btn-register-welcome"
          :to="{
            name: 'signup',
            query: {
              utm_source: utmSource,
              utm_medium: 'Directo Website',
              utm_campaign: null,
              url_dondeseregistra: urlDondeseregistra,
              innerLink: true,
              url_elementoenelqueseregistra: 'btn-register-welcome',
            },
          }"
          label="Registrarme"
          dark
          >CREAR CUENTA</GxButton
        >

        <GxButton
          id="btn-login"
          :to="{
            name: 'login',
          }"
          label="Login"
          dark
          >INICIAR SESIÓN</GxButton
        >
      </div>
    </div>
  </Layout>
</template>
