<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <span
      :class="`role ${$vuetify.theme.dark ? 'white' : 'primary'}--text`"
    >{{ userData.role }}</span>

    <div class="mx-3" />

    <span>Dark Mode</span>

    <v-switch
      v-model="$vuetify.theme.dark"
      class="ma-0 pa-0 ml-3"
      color="secondary"
      hide-details
    />

    <div class="mx-3" />

    <v-btn
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template
        v-if="isCreateur"
        v-slot:activator="{ attrs, on }"
      >
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            v-if="demands > 0"
            color="red"
            overlap
            bordered
          >
            <template
              v-slot:badge
            >
              <span>{{ demands }}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else>
            mdi-bell
          </v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in accounts"
            :key="`item-${i}`"
          >
            <v-list-item-title
              @click="actionAccount(n)"
              v-text="n"
            />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  import firebase from 'firebase/app'
  // Components
  import { VHover, VListItem } from 'vuetify/lib'
  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [],
      accounts: [
        'Profile',
        'Log out',
      ],
    }),
    computed: {
      userData () {
        return this.$store.state.userData
      },
      demands () {
        return this.$store.state.demands
      },
      isCreateur () {
        return this.userData.role === 'Créateur'
      },
      ...mapState(['drawer']),
    },
    watch: {
      demands () {
        if (this.demands > 0) {
          this.notifications = [`Vous avez ${this.demands} d'accès à des projets`]
        } else {
          this.notifications = []
        }
      },
    },
    mounted () {
      if (this.demands > 0) {
        this.notifications = [`Vous avez ${this.demands} d'accès à des projets`]
      }
    },
    methods: {
      actionAccount (action) {
        if (action === 'Profile') {
          this.$router.push('/profile')
        } else {
          this.logout()
        }
      },
      logout () {
        firebase.auth().signOut().then(() => {
          this.$router.push('/auth/login')
        })
      },
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>
<style>
.role{
  font-weight: bold;
}
</style>
