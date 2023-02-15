<script>
import VueMathjax from 'vue-mathjax-next'

export default {
   components: {
      'vm': VueMathjax
   },
   head: {
      meta: [
         {
            name: 'author',
            content: 'Ryan Lin'
         },
         {
            name: 'description',
            content: 'Covering different interpretations to the variational lower bound (ELBO), gradient flow through a Variational Autoencoder, and the use of the reparameterization trick for variance reduction.'
         },
         {
            name: 'keywords',
            content: 'variational autoencoder, bayesian inference, bayes rule, gradient, variational lower bound, elbo, evidence lower bound, reparameterization trick, variation reduction'
         },
         {
            property: 'og:description',
            content: 'Covering different interpretations to the variational lower bound (ELBO), gradient flow through a Variational Autoencoder, and the use of the reparameterization trick for variance reduction.'
         }
      ]
   },
   
   data() {
      return {
         test: `$$\\frac{1}{2}$$`,
         test2: `$\\frac{1}{2}$`,
      }
   }
}
</script>

<template>
   <p>
      (toads)
   </p>
   <vm :formula="this.test" />
</template>

<style scoped>

</style>