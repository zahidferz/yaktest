<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import SubmenuNotificationItem from '@components/_Core/Navigation/TopBar/LeftDrawerSubmenus/SubmenuNotificationItem.vue'
import { SET_ALL_NOTIFICATIONS_AS_READ } from '@src/apollo//mutations.js'
import { NOTIFICATIONS } from '@src/apollo/queries.js'
import GxLoader from '@components/_Core/Utils/GxLoader'
import gql from 'graphql-tag'
export default {
  name: 'NotificationIcon',
  components: { GxIcon, SubmenuNotificationItem, GxLoader },
  props: {
    activeMenu: {
      type: String,
      default: null,
    },
  },
  apollo: {
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
    myAccount: {
      query: NOTIFICATIONS,
      variables() {
        return {
          page: 1,
          size: 50,
        }
      },
      subscribeToMore: [
        {
          document: gql`
            subscription subscriptionNotifications($companyNumber: Int!) {
              userCompanyNotificationCreated(companyNumber: $companyNumber) {
                notification {
                  notificationId
                  readStatus
                  datetime
                  image
                  description
                  userCompleteName
                  userColor
                  branchId
                  resourceReferences {
                    resourceId
                    resourceType
                    resourceDescription
                    resourceReference
                    index
                  }
                }
              }
            }
          `,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!previousResult) {
              return
            }
            previousResult.myAccount.companies[0].notifications.list.unshift(
              subscriptionData.data.userCompanyNotificationCreated.notification
            )
            return {
              myAccount: previousResult.myAccount,
            }
          },
          debounce: 3000,
          error(error) {
            /* eslint-disable */
            console.log('myAccount subscribeToMore error')
            console.log(error)
            /* eslint-enable */
          },
        },
      ],
      error(err) {
        this.error = this.$utils.parseServerError(err)
      },
    },
  },
  data() {
    return {
      blockButton: false,
      showPopover: false,
      error: null,
    }
  },
  computed: {
    showSection() {
      return this.activeMenu === this.$options.name
    },
    notifications() {
      if (this.myAccount) {
        return this.myAccount.companies[0].notifications
      }
      return null
    },
    unReadNotificationLength() {
      if (this.notifications && this.notifications.list.length) {
        const unread = this.notifications.list.filter(
          ({ readStatus }) => readStatus === 'unread'
        )
        return unread.length
      }
      return null
    },
    stringlength() {
      if (this.unReadNotificationLength) {
        return String(this.unReadNotificationLength).length
      }
      return null
    },
  },
  mounted() {
    const clickHandler = (evt) => {
      if (!this.$el.contains(evt.target)) {
        this.$emit('activeMenu', null)
      }
    }
    document.addEventListener('click', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', clickHandler)
    })
  },
  methods: {
    async markAllAsRead() {
      try {
        this.blockButton = true
        await this.$apollo.mutate({
          mutation: SET_ALL_NOTIFICATIONS_AS_READ,
          variables: {
            companyNumber: this.company.number,
            datetime: new Date().toISOString(),
          },
          update: (store, { response }) => {
            const query = {
              query: NOTIFICATIONS,
              variables: {
                page: 1,
                size: 50,
              },
            }
            const data = store.readQuery(query)
            const notifications = data.myAccount.companies[0].notifications.list.map(
              (notification) => {
                const updatedNotification = {
                  ...notification,
                  ...{ readStatus: 'read' },
                }
                return updatedNotification
              }
            )
            data.myAccount.companies[0].notifications.list = notifications
            store.writeQuery({ ...query, data })
          },
        })
        this.blockButton = false
      } catch (error) {
        this.blockButton = false
        /* eslint-disable */
        console.log(error)
        /* eslint-enable */
      }
    },
    showHideMenu() {
      if (this.showSection) {
        this.$emit('activeMenu', null)
      } else {
        this.$emit('activeMenu', this.$options.name)
      }
    },
  },
}
</script>
<template>
  <button
    class="relative w-5 h-6 text-2xl outline-none focus:outline-none"
    @click.stop="showHideMenu"
  >
    <GxIcon
      icon="notifications"
      :class="{
        'text-gray-700': !unReadNotificationLength,
        'text-black': unReadNotificationLength,
      }"
    />
    <div
      v-if="unReadNotificationLength"
      style="line-height:6px"
      class="absolute bottom-0 right-0 flex items-center justify-center text-base font-bold text-white border border-white rounded-full de:text-xs font-gothic bg-alert gx-unread-notifications"
    >
      <div
        v-if="unReadNotificationLength > 99"
        class="w-1 h-1 bg-white rounded"
      ></div>
      <span v-else>
        {{ unReadNotificationLength }}
      </span>
    </div>
    <transition name="popover">
      <section
        v-if="showSection && !error"
        class="absolute right-0 flex flex-col overflow-hidden bg-white w-108 shadow-5 popover"
        @click.stop
      >
        <header
          class="flex items-center justify-between w-full h-8 pl-4 pr-2 border border-gray-200 border-b-1"
        >
          <p class="text-base font-bold uppercase de:text-xs font-gothic"
            >notificaciones</p
          >
          <button
            v-if="notifications && notifications.list.length"
            :disabled="blockButton"
            style="font-size:10px"
            class="text-base font-bold de:text-xs font-gothic"
            @click.stop="markAllAsRead"
            >Marcar todas como leídas</button
          >
        </header>
        <main
          :class="{
            'justify-start': notifications && notifications.length,
            'justify-center':
              !notifications ||
              !notifications.list ||
              !notifications.list.length,
          }"
          class="flex flex-col items-center flex-grow w-full"
        >
          <ul v-if="notifications && notifications.list.length" class="w-full">
            <SubmenuNotificationItem
              v-for="notification in notifications.list.slice(0, 5)"
              :key="`other${notification.notificationId}`"
              :notification="notification"
            />
            <li v-if="notifications.list.length <= 5" class="mt-4">
              <p
                style="font-size:10px"
                class="flex items-center justify-center text-base de:text-xs font-gothic"
              >
                <GxIcon icon="tag_faces" class="mr-1 text-2xl font-bold" />
                Estas son todas tus notificaciones.
              </p>
            </li>
          </ul>
          <GxLoader v-if="$apollo.queries.myAccount.loading" />
          <p
            v-if="notifications && notifications.list.length === 0"
            class="text-base de:text-xs font-gothic"
          >
            <GxIcon
              style="font-size:1.5rem"
              icon="tag_faces"
              class="text-2xl font-bold"
            />
            <br />
            ¡Wow! No tienes más notificaciones.
          </p>
        </main>
        <footer
          v-if="
            notifications &&
              notifications.list.length &&
              notifications.list.length > 5
          "
          style="height:26px"
          class="flex items-center justify-center w-full bg-blue"
        >
          <RouterLink
            :to="{ name: 'notifications' }"
            style="font-size:10px"
            class="text-base font-bold text-black de:text-xs font-gothic"
          >
            Ver todas mis notificaciones
          </RouterLink>
        </footer>
      </section>
      <section
        v-if="showSection && error"
        class="absolute right-0 flex flex-col overflow-hidden bg-white w-108 shadow-5 popover"
        @click.stop
      >
        <header
          class="flex items-center justify-between w-full h-8 pl-4 pr-2 border border-gray-200 border-b-1"
        >
          <p class="text-base font-bold uppercase de:text-xs font-gothic"
            >notificaciones</p
          >
          <button
            v-if="notifications && notifications.list.length"
            :disabled="blockButton"
            style="font-size:10px"
            class="text-base font-bold de:text-xs font-gothic"
            @click.stop="markAllAsRead"
            >Marcar todas como leídas</button
          >
        </header>
        <main
          :class="{
            'justify-start': notifications && notifications.list.length,
            'justify-center': !notifications || !notifications.list.length,
          }"
          class="flex flex-col items-center flex-grow w-full"
        >
          <p>{{ error }}</p>
        </main>
        <footer
          v-if="notifications && notifications.length"
          style="height:26px"
          class="flex items-center justify-center w-full bg-blue"
        >
          <RouterLink
            :to="{ name: 'notifications' }"
            style="font-size:10px"
            class="text-base font-bold text-black de:text-xs font-gothic"
          >
            Ver todas mis notificaciones
          </RouterLink>
        </footer>
      </section>
    </transition>
  </button>
</template>
<style lang="scss" scoped>
.gx-unread-notifications {
  top: 1px;
  width: 0.875rem;
  height: 0.875rem;
  padding-top: 0.5px;
  font-size: 6px;
  transform: translate(2px, 5px);
}
.popover {
  top: 2rem;
  min-height: 28rem;
  border-radius: 8px 0 8px 8px;
  transform-origin: top right;
}
// Vue  animations
// .popover-enter-active {
//   transition: all 0.3s ease-out;
// }
// .popover-leave-active {
//   transition: all 0.3s ease-in;
// }
// .popover-enter,
// .popover-leave-to {
//   opacity: 0;
//   transform: translateY(-1rem) scale(0.1);
// }
// .popover-enter-to {
//   transform: scale(1);
// }
::-webkit-scrollbar {
  width: 8px;
}
</style>
