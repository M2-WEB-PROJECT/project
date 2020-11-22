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
      component: () => import('@/views/Index'),
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
          name: 'Profile',
          path: '/profile',
          component: () => import('@/views/profile/Index'),
        },
        {
          name: 'Discover',
          path: '/discover',
          component: () => import('@/views/discover/Index'),
        },
        {
          name: 'History',
          path: '/history',
          component: () => import('@/views/historique/components/HistoriqueInvestisseur'),
        },
        {
          name: 'Projects',
          path: '/projects',
          component: () => import('@/views/project/ProjectList'),
        },
        {
          name: 'Project',
          path: '/project',
          component: () => import('@/views/project/Project'),
          props: true,
        },
        {
          name: 'ProjectForm',
          path: '/project/form',
          component: () => import('@/views/project/ProjectForm'),
          props: true,
        },
        {
          name: 'TimeLine',
          path: '/timeline',
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
