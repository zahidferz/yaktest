<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'

export default {
  name: 'GxCardAccountingCompany',
  data() {
    return {}
  },
  components: {
    GxIcon,
    GxAvatar,
  },
  props: {
    company: {
      type: Object,
      default: null,
    },
  },
  computed: {
    extractUsers() {
      return this.company.users.filter((item, idx) => idx <= 3)
    },
    countAdditionalUsers() {
      return '+' + (this.company.users.length - 4)
    },
  },
  methods: {
    changeFavorite() {
      this.company.favorite = !this.company.favorite
    },
  },
}
</script>
<template>
  <li class="inline-flex pr-5 w-112">
    <div
      class="flex flex-grow mb-4 border-l-8 rounded cursor-pointer h-42 gxOutter de:mb-0 shadow-2 active:shadow-4 min-w-40 de:hover:bg-gray-200 todos-list-item border-secondary"
    >
      <div class="flex flex-col flex-grow p-4 overflow-hidden">
        <div class="flex pt-1 text-gray-500">
          <span class="flex text-sm">
            {{ company.taxId }}
          </span>
          <GxIcon
            class="flex justify-end flex-grow w-5 hover:font-bold"
            :class="{
              'text-avatar-21': company.favorite,
              '-mr-3': company.favorite,
            }"
            :icon="company.favorite ? 'start' : 'star_outline'"
            @click.prevent="changeFavorite"
          />
        </div>
        <div class="pt-1">
          <span class="text-sm font-bold">
            {{ company.businessName }}
          </span>
        </div>
        <div class="pt-1">
          <span class="text-xm">
            {{ company.commercialName }}
          </span>
        </div>
        <div class="flex flex-grow pt-10 pl-6 ">
          <GxAvatar
            v-for="(user, index) in extractUsers"
            :key="index"
            class="mr-4 -ml-5 rounded-full"
            style="width: 1.5rem; height: 1.5rem;"
            :avatar-img="
              'https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-9/51356418_2029974303724673_4724369282916417536_n.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_eui2=AeF5L9ElJ17WUPHqOZ_0Qy60yJB_WnFlHBXIkH9acWUcFdT_yuD6T5QCKN7FbxJtbHe8XRvfg9vC7MhpsoF81kUY&_nc_ohc=oXocxE4wkjkAX_vndKr&_nc_ht=scontent-qro1-1.xx&oh=582d6be6b4c78c34f0f8108120787816&oe=5ED9DB1F'
            "
          >
          </GxAvatar>

          <GxAvatar
            v-if="this.company.users.length > 4"
            class="mr-4 -ml-5 text-white rounded-full circle"
            style="width: 1.5rem; height: 1.5rem;"
          >
            {{ countAdditionalUsers }}
          </GxAvatar>
          <span class="flex justify-end flex-grow">
            {{ company.profile }}
          </span>
        </div>
      </div>
    </div>
  </li>
</template>
<style lang="scss">
.circle {
  background: var(--primary);
}
</style>
