<script>
export default {
  name: 'SignupOriginSystemOptions',
  data() {
    return {
      originSystemOption: '',
      hasFocus: null,
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onClickOptionCoi() {
      this.originSystemOption = 'coi'
      this.onSubmit()
    },
    onClickOptionContpaqi() {
      this.originSystemOption = 'contpaqi'
      this.onSubmit()
    },
    onSubmit() {
      // const gxSignup = JSON.parse(localStorage.getItem('gxSignup'))
      // gxSignup.body.user.lastName = this.lastname.trim()
      // localStorage.setItem('gxSignup', JSON.stringify(gxSignup))
      this.$router.push({ name: 'signupNumberOfAccounts' })
    },
  },
}
</script>
<template>
  <div
    class="flex flex-col flex-grow p-4 de:p-0"
    :class="{
      'justify-between': !hasFocus,
      'justify-end': hasFocus,
    }"
  >
    <p
      class="text-center text-white gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus,
      }"
      >¿Cuál?</p
    >

    <GxForm class="w-full" @submit="onSubmit">
      <div class="flex items-center block text-center mb-15">
        <GxButton
          id="btn-layout-yes"
          class="mr-3"
          label="COI"
          dark
          @click.prevent="onClickOptionCoi"
          >COI</GxButton
        >

        <GxButton
          id="btn-layout-no"
          class="ml-3"
          label="CONTPAQI"
          dark
          @click.prevent="onClickOptionContpaqi"
          >CONTPAQI</GxButton
        >
      </div>
      <div class="flex">
        <GxTextFieldDark
          v-model="originSystemOption"
          required
          class="mr-4"
          label="Otro"
          assistive=" "
          autofocus
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        />
        <div>
          <GxButtonCircle
            dark
            icon="arrow_forward"
            label="Guardar"
            type="submit"
          />
        </div>
      </div>
    </GxForm>
  </div>
</template>
