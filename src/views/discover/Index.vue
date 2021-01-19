<template>
  <discover-investisseur v-if="isInvestisseur" />
  <discover-createur v-else />
</template>

<script>
  import DiscoverInvestisseur from '@/views/discover/components/DiscoverInvestisseur'
  import DiscoverCreateur from '@/views/discover/components/DiscoverCreateur'
  // import ProfileCreateur from '@/views/discover/components/ProfileCreateur'
  export default {
    name: 'Index',
    components: { DiscoverInvestisseur, DiscoverCreateur },

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
