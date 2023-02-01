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
      <div class="fore">
         <h1>Ryan Lin</h1>
         <h2>Design & Development.</h2>
      </div>
      <h1 class="back">Ryan Lin</h1>
   </div>
</template>

<style scoped>
   .landing-text {
      position: absolute;
      width: calc(100% - 15vw);
      top: calc(50% - 20vmin / 2);
      left: 15vw;
   }

   .fore {
      position: inherit;
      z-index: -1;
   }

   .back {
      position: absolute;
      top: 0;
      color: var(--light200);
      z-index: -75;
   }

   h1 {
      position: relative;
      margin: 0;
      font-family: var(--displayTypeBold);
      font-weight: normal;
      font-size: 9rem;
      color: transparent;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--light200);
   }

   h2 {
      position: relative;
      font-family: var(--displayTypeBold);
      font-weight: normal;
      font-size: 1.75rem;
   }
</style>