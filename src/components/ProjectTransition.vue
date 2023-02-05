<script>
export default {
   data() {
      return {
         bool: true,
      }
   },

   mounted() {
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
   <Transition name="slide" appear>
      <div class="transition" v-if="this.bool"></div>
   </Transition>
</template>

<style scoped>
   .slide-enter-active,
   .slide-leave-active {
      transition: 0.5s ease;
   }

   .slide-enter-from,
   .slide-leave-to {
      transform: translateX(-100%);
      }

   .transition {
      position: absolute;
      height: 100vh;
      width: 100vw;
      background: var(--dark000);
   }
</style>