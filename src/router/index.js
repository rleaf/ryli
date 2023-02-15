import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    /****************************
      Main page routes
    ****************************/

    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingView.vue'),
      meta: {
        title: 'Hello there.',
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About 👋',
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: {
        title: 'Projects 🖊️',
      }
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
      meta: {
        title: 'Blog 📚',
      }
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('../views/FoodView.vue'),
      meta: {
        title: 'Food 🍔',
      }
    },

    /****************************
      Project routes
    ****************************/

    { 
      path: '/projects/spotify', 
      name: 'spotify',
      component: () => import('../views/projects/SpotifyView.vue'),
      meta: {
        title: 'Spotify Desktop',
      }
    },
    { 
      path: '/projects/steam', 
      name: 'steam',
      component: () => import('../views/projects/SteamView.vue'),
      meta: {
        title: 'Steam Case Study',
      }
    },
    { 
      path: '/projects/oscilla', 
      name: 'oscilla',
      component: () => import('../views/projects/OscillaView.vue'),
      meta: {
        title: 'Oscilla Typeface',
      }
    },
    { 
      path: '/projects/sign', 
      name: 'sign',
      component: () => import('../views/projects/SignView.vue'),
      meta: {
        title: 'Hand Gestures',
      }
    },

    /****************************
      Blog routes
    ****************************/

    {
      path: '/blog/quadraticform',
      name: 'quadraticform',
      meta: {
        title: 'Learning to find the derivative of the quadratic form'
      },
      component: () => import('../views/blogs/quadratic_form.vue')
    },
    {
      path: '/blog/knn',
      name: 'knn',
      meta: {
        title: 'Implementing K Nearest Neighbors on CIFAR-10'
      },
      component: () => import('../views/blogs/knn_cifar.vue')
    },
    {
      path: '/blog/bnbackpass',
      name: 'bnbackpass',
      meta: {
        title: 'The Shortcut in Differentiating the Backwards Pass in Batch Normalization'
      },
      component: () => import('../views/blogs/bn_backpass.vue')
    },
    {
      path: '/blog/rnn',
      name: 'rnn',
      meta: {
        title: 'A Thorough Explanation to Recurrent Neural Networks'
      },
      component: () => import('../views/blogs/rnn.vue')
    }, 
    {
      path: '/blog/bigo',
      name: 'bigo',
      meta: {
        title: 'Introduction to Big "Oh" Notation'
      },
      component: () => import('../views/blogs/big_o.vue')
    },
    {
      path: '/blog/cnn',
      name: 'cnn',
      meta: {
        title: 'The Forward and Backward of a Convolutional Neural Network'
      },
      component: () => import('../views/blogs/cnn.vue')
    },
    {
      path: '/blog/transformer',
      name: 'transformer',
      meta: {
        title: 'Transformers Deconstructed and Explained'
      },
      component: () => import('../views/blogs/transformers.vue')
    },
    {
      path: '/blog/entropy',
      name: 'entropy',
      meta: {
        title: 'Entropy in Machine Learning'
      },
      component: () => import('../views/blogs/entropy.vue')
    },
    {
      path: '/blog/kl-divergence-mv-gaussian',
      name: 'dklmvgaus',
      meta: {
        title: 'KL Divergence Between Multivariate Gaussians'
      },
      component: () => import('../views/blogs/dkl_mvgaussian.vue')
    },
    {
      path: '/blog/tractability-and-optimization-of-vae',
      name: 'elbo',
      meta: {
        title: 'Tractability and Optimization of the Variational Autoencoder'
      },
      component: () => import('../views/blogs/elbo.vue')
    },
  ]
})

router.beforeEach((to, _, next) => {
  if (to.meta.title) window.document.title = to.meta.title
  next();
})

export default router
