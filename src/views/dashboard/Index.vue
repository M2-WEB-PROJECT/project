<template>
  <dashboard-admin v-if="isAdmin" />
  <dashboard-investisseur v-else-if="isInvestisseur" />
  <dashboard-createur v-else />
</template>

<script>
  import DashboardAdmin from '@/views/dashboard/components/DashboardAdmin'
  import DashboardCreateur from '@/views/dashboard/components/DashboardCreateur'
  import DashboardInvestisseur from '@/views/dashboard/components/DashboardInvestisseur'
  export default {
    name: 'Index',
    components: { DashboardCreateur, DashboardInvestisseur, DashboardAdmin },

    computed: {
      userData () {
        return this.$store.state.userData
      },
      isInvestisseur () {
        return this.userData.role === 'Investisseur'
      },
      isAdmin () {
        return this.userData.role === 'Admin'
      },

    },
  }
</script>

<style scoped>

</style>
