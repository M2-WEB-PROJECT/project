import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Auth',
      path: '/auth',
      component: () => import('@/views/authentification/Index'),
      children: [
        // Login
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/authentification/login/Login'),
        },
        // Register
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/authentification/register/Register'),
        },
      ],
    },
    {
      path: '/app',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        {
          name: 'TimeLine',
          path: 'pages/timeline',
          component: () => import('@/views/dashboard/pages/Timeline'),
        },
      ],
    },
  ],
})
