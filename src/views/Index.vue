<template>
  <div>
    <dashboard-core-app-bar />
    <dashboard-core-drawer />
    <dashboard-core-view />
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'

  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('../components/core/AppBar'),
      DashboardCoreDrawer: () => import('../components/core/Drawer'),
      DashboardCoreView: () => import('../components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
    computed: {
      userData () {
        return this.$store.state.userData
      },
    },

    mounted () {
      this.checkIfLoggedIn()
    },
    methods: {
      checkIfLoggedIn () {
        firebase.auth().onAuthStateChanged(user => {
          if (!user) {
            this.$router.push('/auth/login')
          } else {
            this.setDataUser(user.uid)
            this.setUser(user)
          }
        })
      },
      async setDataUser (uid) {
        await firestore.collection('users').doc(uid).get().then(async doc => {
          if (doc.exists) {
            await this.setUserData(doc.data())
          }
        })
      },
      ...mapMutations({
        setUser: 'SET_USER',
        setUserData: 'SET_USER_DATA',
      }),
    },
  }
</script>
<style>

</style>
