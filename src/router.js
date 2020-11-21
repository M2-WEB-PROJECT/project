import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      component: () => import('@/views/authentification/Index'),
      redirect: { name: 'Login' },
      children: [
        // Register
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/authentification/register/Register'),
        },
        // Login
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/authentification/login/Login'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      redirect: { name: 'Dashboard' },
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
          component: () => import('@/views/profile/Index'),
        },
        {
          name: 'Discover',
          path: '/discover',
          component: () => import('@/views/discover/Index'),
        },
        {
          name: 'History',
          path: 'tables/historique',
          component: () => import('@/views/historique/components/HistoriqueInvestisseur'),
        },
        {
          name: 'TimeLine',
          path: 'pages/timeline',
          component: () => import('@/views/timeline/Timeline'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/components/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/components/Typography'),
        },
        // {
        //   name: 'Notifications',
        //   path: 'components/notifications',
        //   component: () => import('@/views/dashboard/component/Notifications'),
        // },
        // Tables
        // Maps
        // {
        //   name: 'Google Maps',
        //   path: 'maps/google-maps',
        //   component: () => import('@/views/dashboard/maps/GoogleMaps'),
        // },
      ],
    },
  ],
})
