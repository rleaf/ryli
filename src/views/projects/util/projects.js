import gsap from 'gsap'

function contentObserver() {
   const observer = new IntersectionObserver(entries => {
         entries.forEach(entry => {
            const id = entry.target.getAttribute('id')
            if (entry.intersectionRatio > 0) {
               document.querySelector(`nav li a[href="#${id}"]`).classList.add('active')
            } else {
               document.querySelector(`nav li a[href="#${id}"]`).classList.remove('active')
            }
         })
      },
         {
            rootMargin: "-30% 0% -50% 0%"
         })

      document.querySelectorAll('section[id]').forEach((section) => {
         observer.observe(section)
      });
}

function titleTween() {
   gsap.from('h1', {
      delay: 0.25,
      y: '70vh',
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
   })
}

export default {
   contentObserver,
   titleTween
}