<template>
  <div>
    <dashboard-core-app-bar />
    <dashboard-core-drawer />
    <dashboard-core-view />
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'

  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('../../components/core/AppBar'),
      DashboardCoreDrawer: () => import('../../components/core/Drawer'),
      DashboardCoreView: () => import('../../components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),

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
        await firestore.collection('users').doc(uid).get().then(doc => {
          if (doc.exists) {
            this.setUserData(doc.data())
          } else {
            // doc.data() will be undefined in this case
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
