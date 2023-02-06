<script>
import gsap from 'gsap'

export default {
   data() {
      return {
         bool: true,
         node: null,
         // tl: null
      }
   },

   methods: {
      transition() {
         // const tl = gsap.timeline({
         //    defaults: {
         //       // Divide by 1000 for ms -> sec, multiply by 2 for 2 tweens
         //       duration: this.duration / 2000,
         //       // duration: 1000,
         //       ease: 'power4.inOut'
         //    }
         // })

         this.tl.from(this.node, {
            x: '-100%',
         })
         .to(this.node, {
            x: '-100%',
         })
         window.setTimeout(() => {
            this.bool = false
         }, this.duration)
      }
   },

   mounted() {
      this.tl = gsap.timeline({
            defaults: {
               duration: this.duration / 2000,
               ease: 'power4.inOut'
            }
         })

      this.node = this.$refs.node
      this.transition()
      console.log(this.transition)
   },
   
   beforeUnmount() {
      console.log(this.node)
      this.bool = true
      console.log(this.transition)
      this.transition()
   },

   props: {
      duration: {
         default: 1500
      }
   }
}
</script>

<template>
   <!-- <div class="transition" v-if="this.bool" ref="node"></div> -->
   <div class="transition" ref="node"></div>
</template>

<style scoped>
   .transition {
      position: absolute;
      height: 100vh;
      width: 100vw;
      background: var(--dark000);
   }
</style>