<template>
  <historique-investisseur v-if="isInvestisseur" />
  <historique-createur v-else />
</template>

<script>
  import HistoriqueInvestisseur from '@/views/historique/components/HistoriqueInvestisseur'
  import HistoriqueCreateur from '@/views/historique/components/HistoriqueCreateur'
  export default {
    name: 'Index',
    components: { HistoriqueCreateur, HistoriqueInvestisseur },

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
