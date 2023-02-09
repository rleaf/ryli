import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('../views/FoodView.vue')
    },
    { 
      path: '/projects/spotify', 
      name: 'spotify',
      component: () => import('../views/projects/SpotifyView.vue'),
    },
    { 
      path: '/projects/steam', 
      name: 'steam',
      component: () => import('../views/projects/SteamView.vue')
    },
    { 
      path: '/projects/oscilla', 
      name: 'oscilla',
      component: () => import('../views/projects/OscillaView.vue')
    },
    { 
      path: '/projects/sign', 
      name: 'sign',
      component: () => import('../views/projects/SignView.vue')
    }

  ]
})

export default router
