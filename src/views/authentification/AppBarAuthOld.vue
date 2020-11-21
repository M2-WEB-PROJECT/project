<template>
  <v-app-bar
    color="accent"
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
    <v-col cols="3">
      <v-tabs
        background-color="accent"
        slider-color="info"
        active-class="primary"
      >
        <v-tab @click="toLogIn">
          Log In
        </v-tab>
        <v-tab @click="toRegister">
          Register
        </v-tab>
      </v-tabs>
    </v-col>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'AppBarAuth',
    methods: {
      toLogIn () {
        this.$router.push({ name: 'Login' })
      },
      toRegister () {
        this.$router.push({ name: 'Register' })
      },
    },
  }
</script>

<style scoped>

</style>
