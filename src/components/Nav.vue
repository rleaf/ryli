<script>

</script>

<template>
   <nav>
      <RouterLink to="/"><img src="../assets/logo.svg" width="50" alt=""></RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/blog">Blog</RouterLink>
      <RouterLink to="/food">Food</RouterLink>
      <div class="rhs-nav">
         <a href="https://github.com/rleaf" target="_blank">Github</a>
         <a href="https://www.youtube.com/channel/UCe8X-Ib4hEc7keoBQ7cMdmA" target="_blank">YouTube</a>
      </div>
   </nav>
</template>

<style scoped>
   nav {
      padding: 0 4rem;
      padding-top: 3rem;
      display: flex;
      gap: 3rem;
      align-items: center;
   }

   nav a {
      font-family: var(--sansType);
      font-size: 0.9rem;
      text-decoration: none;
      color: white;
   }

   .rhs-nav {
      margin-left: auto;
   }

   .rhs-nav a:first-child {
      padding-right: 3rem;
   }
</style>