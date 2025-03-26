<template>
  <div class="relative bg-cover bg-center h-screen" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="absolute inset-0 bg-black opacity-30"></div>

    <div class="flex flex-col pt-20 justify-center items-center h-full text-center px-6">
      <h1 class="text-4xl w-full md:w-2/3 md:text-5xl font-bold text-white leading-tight">
        ОПАНУЙ 6 НАЙПОТУЖНІШИХ ЛІФТИНГ - ТЕХНІК ТА СТАНЬ ЕКСПЕРТОМ ПРИРОДНОГО ОМОЛОДЖЕННЯ обличчя!
      </h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import anime from 'animejs/lib/anime.es.js';

import backgroundImage from '@/assets/images/facemassagemain.jpg';

onMounted(() => {
  // Animate the heading
  anime({
    targets: 'h1',
    translateY: [-40, 0],  // Animate from -40px to 0px
    opacity: [0, 1],       // Animate opacity from 0 to 1
    duration: 800,         // Duration of 800ms
    easing: 'easeOutQuad', // Easing function for smoothness
  });

  // Animate the video iframe (optional)
  anime({
    targets: 'iframe',
    translateY: [40, 0],   // Animate iframe from 40px to 0px
    opacity: [0, 1],       // Animate opacity from 0 to 1
    duration: 1000,        // Duration of 1000ms
    easing: 'easeOutQuad',
    delay: 500,            // Delay animation start for 500ms
  });
});
</script>

<style scoped>
/* Any custom styles can go here */
</style>
