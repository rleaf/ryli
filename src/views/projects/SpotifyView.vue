<script>
import ProjectTransition from '../../components/ProjectTransition.vue'

export default {
   components: {
      ProjectTransition
   },

   data() {
      return {

      }
   },

   mounted() {

   }
}
</script>

<template>
   <ProjectTransition :duration="1500" />
   <div class="spotify-main">
      Spotify page
   </div>
</template>

<style scoped>

</style>