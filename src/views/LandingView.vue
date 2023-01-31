<script>
export default {
   data() {
      return {

      }
   },

   mounted() {

   }
}
</script>

<template>
   
   <div class="landing-text">
      <h1>Ryan Lin</h1>
      <h2>Design & Development.</h2>
   </div>
</template>

<style scoped>
.landing-text {
      position: absolute;
      top: calc(35% - 10vmin/ 2);
      left: 15vw;
   }

   h1 {
      font-family: var(--displayType);
      font-weight: normal;
      font-size: 9rem;
      /* color: var(--light000); */
      /* opacity: 0.1; */
      margin-bottom: 0;
      color: transparent;
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--light000);
   }

   h2 {
      font-family: var(--displayType);
      font-weight: normal;
      font-size: 1.75rem;
      margin-bottom: 0;
   }
</style>