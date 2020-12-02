<template>
  <v-main>
    <div class="height100">
      <router-view />
    </div>
    <dashboard-core-footer />
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
<style>
.height100{
  min-height: 31.2em;
}
</style>
