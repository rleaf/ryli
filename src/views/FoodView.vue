<script>
import Experience from '../assets/Experience/Experience'
import recipes from '../assets/recipes'
import gsap from 'gsap'

export default {
   data() {
      return {
         experience: new Experience(),
         recipes: recipes,
         search: '',
      }
   },

   created() {
      this.sphere = this.experience.world.sphere
      this.scene = this.experience.scene
   },

   mounted() {
      this.scene.remove(this.sphere.mesh)
      this.sphere.geometry.dispose()
      this.sphere.material.dispose()

      const tl = gsap.timeline({
         defaults: {
            duration: 1,
            ease: 'power2inOut'
         }
      })

      tl.from('.text-mask h2', {
         yPercent: '+200',
         delay: 0.5,
      })
      .from('.food-head input', {
         yPercent: '+200',
         duration: 0.9,
      }, '<+0.2')
      .from('.recipe', {
         opacity: 0,
         stagger: 0.1
      }, '<+0.3')
   },

   computed: {
      filteredRecipes() {
         return this.recipes.filter(post => {
            return post.title.toLowerCase().includes(this.search.toLowerCase())
         })
      }
   }
}
</script>

<template>
   <div class="food-main">
      <div class="food-head">
         <div class="text-mask">
            <h2>The most important section...</h2>
         </div>
         <div class="text-mask">
            <input type="text" v-model="search" placeholder="Search..." />
         </div>
      </div>
      <div class="food-body">
         <div class="recipe" v-for="(recipe, i) in filteredRecipes" :key="i">
            <h3 class="recipe-head">{{ recipe.title }}</h3>

            <div v-if="recipe.list" class="checkList">
               <div v-for="item in recipe.list" :key="item">
                  <label class="strikethrough">
                     <input type="checkbox">
                     <span>{{ item }}</span>
                  </label>
               </div>
            </div>

            <p v-if="recipe.body" class="recipe-body">
               {{ recipe.body }}
            </p>
            <p v-if="recipe.source" class="recipe-source">
               Source: <a :href='recipe.source.value' target="_blank">{{ recipe.source.key }}</a>
            </p>
         </div>
      </div>
   </div>
</template>

<style scoped>
   .checkList input[type="checkbox"] {
      accent-color: var(--light200);
   }

   .checkList input[type="checkbox"]:checked + span {
      text-decoration: line-through;
      color: var(--light600);
      text-decoration-thickness: 0.1rem;
   }
   .food-body {
      display: flex;
      flex-wrap: wrap;
      gap: 2vw;
      padding-left: 8vw;
   }
   .recipe {
      max-width: 400px;
   }
   .food-head {
      top: 20vh;
      left: 8%;
      padding-left: 8vw;
      padding-top: 20vh;
      padding-bottom: 10vh;
   }

   a {
		color: var(--light000);
	}

   a:hover {
      transition: 0.25s; 
      background: var(--dark400);
   }
   h2 {
      font-size: 3rem;
      margin: 0;
   }

   .food-head input {
      background: transparent;
      border: none;
      padding: 0.4rem 0.5rem;
      margin-top: 1rem;
      font-family: var(--displayTypeReg);
      font-style: oblique;
      color: var(--light000);
      border-bottom: 1px solid var(--light200);
      font-size: 1.5rem;
   }

   input:focus {
      outline: none;
   }
</style>