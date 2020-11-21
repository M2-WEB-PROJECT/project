<template>
  <div>
    <app-bar-auth />
    <router-view class="mb" />
    <dashboard-core-footer />
  </div>
</template>

<script>
  import AppBarAuth from '@/views/authentification/AppBarAuth'
  export default {
    name: 'Index',
    components: {
      AppBarAuth,
      DashboardCoreFooter: () => import('@/components/core/Footer'),
    },
  }
</script>

<style>
.mb{
  margin-top: 10em;
  margin-bottom: 10em;
}
</style>
