<script>
import gsap from 'gsap'

export default {
   data() {
      return {
         bool: true,
         node: null,
      }
   },

   mounted() {

      this.node = this.$refs.node
      const tl = gsap.timeline({
         defaults: {
            // Divide by 1000 for ms -> sec, multiply by 2 for 2 tweens
            duration: this.duration / 2000,
            ease: 'power4.inOut'
         }
      })

      tl.from(this.node, {
         x: '-100%',
      })
      .to(this.node, {
         x: '-100%',
      })
      window.setTimeout(() => {
         this.bool = false
      }, this.duration)
   },

   props: {
      duration: {
         default: 1500
      }
   }
}
</script>

<template>
   <div class="transition" v-if="this.bool" ref="node"></div>
</template>

<style scoped>
   .transition {
      position: absolute;
      height: 100vh;
      width: 100vw;
      background: var(--dark000);
   }
</style>