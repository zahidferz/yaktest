<script>
import CountryFlags from '@src/assets/Catalogos/CountryFlags.json'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxDivider from '@components/_Core/Dividers/GxDivider'
export default {
  name: 'CountryCodeDropdownDe',
  components: {
    GxIcon,
    GxDivider,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      innerValue: this.value,
      countries: CountryFlags,
      focusTimeStamp: null,
      selectedCode: null,
      isOpen: false,
    }
  },
  computed: {
    innerSelection() {
      if (this.innerValue) {
        return this.countries.find((c) => c.code === this.innerValue)
      }
      return null
    },
    selectedIndex() {
      if (this.selectedCode === null) return 0
      return this.countries.findIndex((c) => c.code === this.selectedCode)
    },
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
  },
  mounted() {
    const onClickOutSide = (evt) => {
      if (this.$el.contains(evt.target)) return null
      this.isOpen = false
    }
    document.addEventListener('click', onClickOutSide)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', onClickOutSide)
    })
  },
  methods: {
    selectOption(country) {
      const selection = this.countries.find((c) => {
        return c.country === country
      })
      this.innerValue = selection.code
      this.isOpen = false
    },
    onArrowUp() {
      if (!this.selectedIndex || !this.isOpen) return
      this.selectedCode = this.countries[this.selectedIndex - 1].code
      this.scrollIntoRow(this.countries[this.selectedIndex].country)
    },
    onArrowDown() {
      if (this.selectedIndex === this.countries.length || !this.isOpen) return
      this.selectedCode = this.countries[this.selectedIndex + 1].code
      this.scrollIntoRow(this.countries[this.selectedIndex].country)
    },
    scrollIntoRow(country) {
      const element = document.getElementById(country)
      if (element) {
        element.scrollIntoView()
      }
    },
    blur() {
      this.$el.blur()
    },
    onEnter() {
      if (this.isOpen) {
        this.blur()
      } else {
        this.isOpen = true
      }
    },
    onBlur() {
      this.innerValue = this.countries[this.selectedIndex].code
      this.isOpen = false
    },
    onFocus(evt) {
      // When you click a button  first focus is fired then click
      // This coditional allows open and close the menu options
      // whith a click and when the button
      // is focused using the keyboard
      this.focusTimeStamp = evt.timeStamp
      this.isOpen = true
    },
    onClick(evt) {
      // When you click a button  first focus is fired then click
      // This coditional allows open and close the menu options
      // whith a click and when the button
      // is focused using the keyboard
      if (this.focusTimeStamp) {
        this.focusTimeStamp = null
      } else {
        this.isOpen = !this.isOpen
      }
    },
  },
}
</script>
<template>
  <!-- items-stretch is needed to work properly on chrome -->
  <button
    style="width:108px;"
    type="button"
    class="hover:bg-gray-100 rounded-t-lg flex-shrink-0 focus:outline-none  relative"
    @blur="onBlur"
    @keydown.up="onArrowUp"
    @keydown.down="onArrowDown"
    @keydown.enter="onEnter"
    @keyup.esc="blur"
    @click="onClick"
    @focus.prevent="onFocus"
  >
    <div class="relative">
      <span
        class="ml-2 gxCountryName absolute w-full bottom-0 text-2xs text-left leading-normal truncate"
        >{{ innerSelection.country }}</span
      >
      <img
        :src="innerSelection.svgURL"
        class="w-3 h-3 gxBottom absolute left-0  ml-2"
      />
      <input
        :class="{ 'border-gray-300': !isOpen, 'border-black': isOpen }"
        class="gxInput w-full w-min-0 border-b hover:bg-black"
        :value="innerSelection.code"
        disabled
      />
      <GxIcon icon="expand_more" class="gxBottom absolute  right-0  mr-2" />
    </div>
    <section
      v-if="isOpen"
      tabindex="-1"
      class="absolute right-0 mt-1 popover overflow-x-hidden overflow-y-auto shadow-3 bg-white rounded-l-lg rounded-br-lg"
    >
      <table ref="list" class="table-auto overflow-hidden" @mousedown.prevent>
        <tbody class="overflow-hidden">
          <tr
            v-for="(country, index) in countries.slice(0, 2)"
            :id="country.country"
            :key="country.country"
            :class="{
              'bg-secondary-50': country.code === selectedCode,
              'mt-1': index === 0,
              'mt-2': index > 0,
            }"
            class="w-full overflow-hidden"
            @click.prevent.stop="selectOption(country.country)"
            @mouseenter="selectedCode = country.code"
          >
            <td class="pl-2 align-middle">
              <img
                style="min-width:10px;height:10px"
                loading="lazy"
                :src="country.svgURL"
                class="bg-gray-200 border-none outline-none"
              />
            </td>
            <td class="align-middle pl-2">
              <p class="text-2xs text-left">{{ country.code }}</p>
            </td>
            <td class="align-middle overflow-hidden">
              <p class="text-2xs text-left pl-2 flex py-1">
                <span class="truncate">{{ country.country }}</span>
              </p>
            </td>
            <td class="align-middle pr-2">
              <GxIcon
                v-if="innerSelection.code === country.code"
                icon="done"
                class="ml-auto"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <GxDivider class="m-2" />
            </td>
          </tr>
          <tr
            v-for="country in countries.slice(2)"
            :id="country.country"
            :key="country.country"
            :class="{ 'bg-secondary-50': country.code === selectedCode }"
            class="w-full overflow-hidden"
            @click.prevent.stop="selectOption(country.country)"
            @mouseenter="selectedCode = country.code"
          >
            <td class="pl-2 align-middle">
              <img
                style="min-width:10px;height:10px"
                loading="lazy"
                :src="country.svgURL"
                class="bg-gray-200 border-none outline-none"
              />
            </td>
            <td class="align-middle pl-2">
              <p class="text-2xs text-left">{{ country.code }}</p>
            </td>
            <td class="align-middle overflow-hidden">
              <p class="text-2xs text-left pl-2  py-1 flex">
                <span class="truncate">{{ country.country }}</span>
              </p>
            </td>
            <td class="align-middle pr-2">
              <GxIcon
                v-if="innerSelection.code === country.code"
                icon="done"
                class="ml-auto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </button>
</template>
<style lang="scss" scoped>
.popover {
  top: calc(100% + 4px);
  z-index: 2;
  // width: 169px;
  height: 92px;
}
.gxInput {
  padding-top: 21px;
  padding-bottom: 4px;
  padding-left: calc(8px + 12px + 8px);
  line-height: 1;
}
.gxBottom {
  bottom: 6px;
}
.gxCountryName {
  padding-bottom: 8px;
  transform: translate3d(0, -14px, 0);
}
.gxInput:disabled {
  pointer-events: none;
  background-color: transparent;
}
</style>
