<template>
  <dashboard-investisseur v-if="isInvestisseur" />
  <dashboard-createur v-else />
</template>

<script>
  import DashboardCreateur from '@/views/dashboard/components/DashboardCreateur'
  import DashboardInvestisseur from '@/views/dashboard/components/DashboardInvestisseur'
  export default {
    name: 'Index',
    components: { DashboardCreateur, DashboardInvestisseur },

    computed: {
      userData () {
        return this.$store.state.userData
      },
      isInvestisseur () {
        return this.userData.role === 'Investisseur'
      },

    },
  }
</script>

<style scoped>

</style>
