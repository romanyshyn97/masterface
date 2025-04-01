<template>
  <div class="relative bg-cover bg-center h-screen" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="absolute inset-0 bg-black opacity-30"></div>

    <div class="flex flex-col pt-20 justify-center items-center h-full text-center px-6">
      <h1 class="text-4xl w-full md:w-2/3 md:text-5xl font-bold text-white leading-tight">
        ОПАНУЙ 6 НАЙПОТУЖНІШИХ ЛІФТИНГ - ТЕХНІК ТА СТАНЬ ЕКСПЕРТОМ ПРИРОДНОГО ОМОЛОДЖЕННЯ обличчя!
      </h1>
      <Button label="Бронюй зараз зі знижкою 40% " @click="visible = true" class="!bg-logo-pink !border-logo-pink mt-8" />
      <div class="text-deep-lavender">*cтандартна ціна без врахування знижки 500$</div>
      <Dialog v-model:visible="visible" modal header="Бронювання курсу" :style="{ width: '400px' }">
        <div class="space-y-4 text-center mb-4">
          <p class="text-lg">Ви можете зв'язатись зі мною за допомогою:</p>
          <div class="flex justify-center space-x-6">
            <a href="https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk" target="_blank" class="text-gray-600 hover:text-gray-900">
              <font-awesome-icon class="h-8 hover:text-[#FF66C4] transition-colors duration-300" :icon="['fab', 'instagram']" />
            </a>
            <a href="https://t.me/+380983693213" target="_blank" class="text-gray-600 hover:text-gray-900">
              <font-awesome-icon class="h-8 hover:text-blue-500 transition-colors duration-300" :icon="['fab', 'telegram']" />
            </a>
            <a href="viber://chat?number=+380983693213" class="text-gray-600 hover:text-gray-900">
              <font-awesome-icon class="h-8 hover:text-purple-500 transition-colors duration-300" :icon="['fab', 'viber']" />
            </a>
          </div>
          <p class="text-lg mt-4">Або за номер телефону:</p>
          <a href="tel:+380983693213" class="text-blue-500 text-xl font-semibold">+380983693213</a>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import anime from 'animejs/lib/anime.es.js';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const visible = ref(false);

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
