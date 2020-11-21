<template>
  <user-profile-investisseur v-if="isInvestisseur" />
  <user-profile-createur v-else />
</template>

<script>
  import UserProfileInvestisseur from '@/views/profile/components/UserProfileInvestisseur'
  import UserProfileCreateur from '@/views/profile/components/UserProfileCreateur'
  export default {
    name: 'Index',
    components: { UserProfileInvestisseur, UserProfileCreateur },

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
