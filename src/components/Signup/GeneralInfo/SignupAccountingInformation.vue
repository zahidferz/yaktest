<script>
import GxTextArea from '@components/_Core/Forms/GxTextArea'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
export default {
  name: 'SignupAccountingInformation',
  data() {
    return {
      createAccountError: null,
      hasFocus: false,
      numberOfAccountants: '',
      showSelectSystemOrigin: true,
      originSystem: '',
      numberOfAccounts: '',
      problemToSolve: '',
      loading: false,
      loadingSuccess: false,
    }
  },
  components: {
    GxTextArea,
    GxDropdown,
  },
  computed: {
    countTextAreaLetters() {
      return this.problemToSolve.length
    },
    getArrayNumericOptions() {
      return Array(100)
        .fill()
        .map((_, i) => (i + 1 !== 100 ? String(i + 1) : String(i + 1) + '+'))
    },
    getArraySystemOrigin() {
      return ['COI', 'Contpaqi', 'Otro']
    },
  },
  methods: {
    changeSelectSystemOrigin() {
      if (this.originSystem === 'Otro') {
        this.showSelectSystemOrigin = false
        this.originSystem = ''
      }
    },
    async onSubmit() {
      if (this.mq === 'mo') {
        this.$refs.GxTextFieldDarkName.setFocus()
      }
      try {
        // Mobile and Desktop validations PASSED. Submit.
        this.loading = true
        if (this.$mq === 'de') {
          await this.submitDesktop()
        } else {
          await this.submitMobile()
        }
      } catch (error) {
        this.createAccountError = this.$utils.parseServerError(error)
      } finally {
        this.loading = false
        this.loadingSuccess = false
      }
    },
    async submitMobile() {
      this.$router.push({ name: 'signupOriginSystem' })
    },
    async submitDesktop() {
      this.$router.push({ name: 'signupAccountCompleted' })
    },
  },
}
</script>

<template>
  <div class="flex flex-col justify-between flex-grow p-4 de:p-0">
    <!-- Mobile -->
    <MqLayout
      class="flex flex-col flex-grow"
      :class="{
        'justify-between': !(hasFocus && $utils.isIphone),
        'justify-end': hasFocus && $utils.isIphone,
      }"
      mq="mo"
    >
      <p
        class="pl-5 pr-5 text-center text-white pt-15 gx-h3"
        :class="{
          'pb-0': hasFocus,
          'pb-4': !hasFocus,
          'mb-32': hasFocus && $utils.isIphone,
        }"
        style="transition: all .3s"
      >
        ¿Cuántos contadores tiene tu despacho?
      </p>
      <GxForm class="flex w-full" @submit="onSubmit">
        <GxTextFieldDarkNumeric
          ref="GxTextFieldDarkName"
          v-model="numberOfAccountants"
          required
          class="mr-4 tex t- black"
          label="Número de contadores"
          assistive=" "
          autofocus
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        />
        <div>
          <GxButtonCircle
            dark
            type="submit"
            icon="arrow_forward"
            label="Guardar"
          />
        </div>
      </GxForm>
    </MqLayout>
    <!-- Desktop -->
    <MqLayout
      class="flex flex-col items-center justify-center flex-grow overflow-hidden body-gradients"
      mq="de"
    >
      <div class="flex flex-col flex-grow de:overflow-hidden body-gradients">
        <div
          class="flex flex-col p-4 mt-8 h-136 de:p-8 de:mx-auto de:shadow-3 de:flex-grow-0 de:relative de:rounded-lg de:w-108 de:mt-40 de:bg-white"
        >
          <h1 v-if="$mq === 'de'" class="mb-8 font-bold text-center de:gx-h4"
            >Háblanos de tu despacho</h1
          >
          <GxForm class="flex flex-col flex-grow" @submit="onSubmit">
            <GxTextFieldNumeric
              class="pl-3 pr-3"
              v-model="numberOfAccountants"
              label="¿Cuántos contadores tiene tu despacho?"
              placeholder="¿Cuántos contadores tiene tu despacho?"
              autofocus
            />
            <transition name="fade">
              <GxDropdown
                class="mt-3 -mb-4"
                v-if="showSelectSystemOrigin"
                v-show="numberOfAccountants.trim().length > 0"
                v-model="originSystem"
                label="¿Qué sistema utilizas actualmente?"
                placeholder="¿Qué sistema utilizas actualmente?"
                :options="getArraySystemOrigin"
                @input="changeSelectSystemOrigin"
                watchValue
              />

              <GxTextField
                v-else
                class="pt-3 pl-3 pr-3"
                v-show="numberOfAccountants.trim().length > 0"
                v-model="originSystem"
                label="¿Qué sistema utilizas actualmente?"
                placeholder="¿Qué sistema utilizas actualmente?"
                autofocus
              />
            </transition>

            <transition name="fade">
              <GxTextFieldNumeric
                class="pt-3 pl-3 pr-3"
                v-show="
                  numberOfAccountants.trim().length > 0 &&
                    originSystem.trim().length > 0
                "
                v-model="numberOfAccounts"
                label="¿Cuántas contabilidades lleva tu despacho?"
                placeholder="Número de contabilidades"
              />
            </transition>
            <transition name="fade">
              <p
                class="px-5 pt-4 text-2xs "
                v-show="
                  numberOfAccountants.trim().length > 0 &&
                    originSystem.trim().length > 0 &&
                    numberOfAccounts.trim().length > 0
                "
                >¿Cuál es el problema principal que quieres resolver con
                Taxes?</p
              >
            </transition>
            <transition name="fade">
              <GxTextArea
                v-show="
                  numberOfAccountants.trim().length > 0 &&
                    originSystem.trim().length > 0 &&
                    numberOfAccounts.trim().length > 0
                "
                required
                v-model="problemToSolve"
                label=""
                placeholder="Escribe aquí..."
                class="px-3"
              />
            </transition>
            <transition name="fade">
              <p
                class="pr-4 text-right"
                v-show="
                  numberOfAccountants.trim().length > 0 &&
                    originSystem.trim().length > 0 &&
                    numberOfAccounts.trim().length > 0
                "
                >{{ countTextAreaLetters }}/1000</p
              >
            </transition>
            <transition name="fade">
              <GxButton
                v-show="
                  numberOfAccountants.trim().length > 0 &&
                    originSystem.trim().length > 0 &&
                    numberOfAccounts.trim().length > 0
                "
                :dark="$mq === 'mo'"
                type="submit"
                :loading="loading"
                :loading-success="loadingSuccess"
                class="mx-auto mt-8"
                >INICIAR</GxButton
              >
            </transition>
          </GxForm>
        </div>
      </div>
    </MqLayout>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-delay-enter-active,
.fade-delay-leave-active {
  transition: opacity 0.2s 0.3s;
}
.fade-delay-enter,
.fade-delay-leave-to,
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
