<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="accent"
    flat
    height="75"
  >
    <v-img
      src="@/assets/icon.jpg"
      max-width="50"
    />
    <v-toolbar-title
      class="ml-5"
    >
      Finance Up
    </v-toolbar-title>

    <v-spacer />

    <div class="mx-3" />

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
  import { VHover, VListItem } from 'vuetify/lib'

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

    data: () => ({
      accounts: [
        'Sign In',
        'Sign Up',
      ],
    }),

    methods: {
      toLogIn () {
        this.$router.push({ name: 'Login' })
      },
      toRegister () {
        this.$router.push({ name: 'Register' })
      },
      actionAccount (action) {
        if (action === 'Sign In') {
          this.toLogIn()
        } else {
          this.toRegister()
        }
      },
    },
  }
</script>
<style>
.role{
  font-weight: bold;
}
</style>
