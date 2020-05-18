<script>
import Layout from '@layouts/LayoutMain'
import LoginForm from '@src/components/Login/LoginForm'
export default {
  page: {
    title: 'Login',
    meta: [{ name: 'description', content: 'Login' }],
  },
  components: { Layout, LoginForm },
  methods: {
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.push({ name: 'welcome' })
    },
  },
}
</script>

<template>
  <Layout
    :icon="$mq === 'mo' ? 'keyboard_backspace' : null"
    :title="$mq === 'mo' ? 'Inicia sesión' : null"
    :dark="$mq === 'mo'"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed top-0 left-0 mt-8 ml-8"
      ><figure>
        <img
          class="w-41"
          src="@assets/images/Logos/black.svg"
          alt="Taxes Logo"/></figure
    ></a>
    <LoginForm />

    <!-- Top Right shortcuts -->
    <div
      v-if="$mq === 'de'"
      class="fixed top-0 right-0 flex items-center pt-4 pr-4"
    >
      <button class="flex items-center mr-2 group" @click="goBack">
        <GxIcon
          icon="keyboard_arrow_left"
          class="mr-2 text-gray-800 hover:font-bold group-hover:text-black"
        />
        <span class="mr-4 text-gray-800 hover:font-bold group-hover:text-black"
          >Regresar</span
        >
      </button>
      <GxIcon
        icon="stars"
        style="color: var(--secondary-200);"
        class="gx-star-icon"
      />
    </div>
    <!-- Bottom Right shortcuts -->
    <div v-if="$mq === 'de'" class="fixed bottom-0 right-0 mb-5 mr-24">
      <div class="flex items-center justify-end mb-2">
        <!-- El teléfono tiene que incluir código internacional -->
        <a
          target="_blank"
          href="https://wa.me/525562723014"
          class="flex items-center mr-4"
        >
          <img
            src="@assets/images/Login/whats.svg"
            alt="Whatsapp"
            class="mr-2 whatsapp"
          />
          <p class="text-white whatsapp">55 6272 3014</p>
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com/chainapp/"
          class="mr-2"
        >
          <img class="facebook" src="@assets/images/Login/face.svg" />
        </a>
        <a target="_blank" href="https://www.instagram.com/chain_hq/">
          <img class="instagram" src="@assets/images/Login/instagram.svg" />
        </a>
      </div>
      <div class="flex items-center justify-center text-gray-300">
        <RouterLink
          :to="{ name: 'termsandconditions' }"
          target="_blank"
          class="text-white uppercase terms"
          >Términos y condiciones</RouterLink
        >
        <GxIcon icon="lens" style="font-size: 4px;" class="mx-2" />
        <RouterLink
          :to="{ name: 'privacypolicy' }"
          target="_blank"
          class="text-white uppercase terms"
          >Privacidad</RouterLink
        >
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.gx-star-icon {
  background-color: white;
  border-radius: 50%;
}
.terms:hover,
.whatsapp:hover,
.instagram:hover,
.facebook:hover {
  filter: brightness(70%);
}
</style>
