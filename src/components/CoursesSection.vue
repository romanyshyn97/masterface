<template>
  <section class="flex flex-col space-y-4 sm:flex-row items-center justify-center sm:space-x-8 sm:space-y-0 py-12" id="courses">
    <!-- Course 1 Card -->
    <div
        @click="flipCard(1)"
        ref="card1"
        class="w-80 h-48 perspective cursor-pointer hover:scale-105 transition-transform duration-500"
    >
      <div class="relative  w-full h-full transform-style preserve-3d transition-transform duration-1000 ease-in-out">
        <div class="card-front text-center absolute w-full h-full flex items-center justify-center bg-pink-200 text-gray-700 text-xl rounded-lg shadow-lg">
          <h2>Онлайн курс<br>"Самомасаж обличчя"</h2>
        </div>
        <div class="card-back absolute w-full h-full flex flex-col items-center justify-center bg-[#F5E6DA] text-white text-lg font-medium rounded-lg shadow-lg transform rotateY-180">
          <h2>Навчальний курс<br> "Омолоджуючий масаж обличчя"</h2>
          <p class="mt-2 text-center text-sm">Learn Vue.js and modern frontend development techniques.</p>
        </div>
      </div>
    </div>

    <!-- Course 2 Card -->
    <div
        @click="flipCard(2)"
        ref="card2"
        class="w-80 h-48 perspective cursor-pointer transition-transform duration-500"
    >
      <div class="relative w-full h-full transform-style preserve-3d transition-transform duration-1000 ease-in-out">
        <div class="p-4 card-front text-center absolute w-full h-full flex items-center justify-center bg-pink-200 text-gray-700 text-xl rounded-lg shadow-lg">
          <h2>Навчальний курс<br> "Омолоджуючий масаж обличчя"</h2>
        </div>
        <div class="card-back absolute w-full h-full flex flex-col items-center justify-center bg-[#F5E6DA] text-gray-700 text-lg font-medium rounded-lg shadow-lg transform rotateY-180">
          <h2>Course 2 Details</h2>
          <p class="mt-2 text-center text-sm">Master advanced JavaScript and backend integration.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import anime from 'animejs/lib/anime.es.js'

const card1 = ref(null)
const card2 = ref(null)
const flipCard = (cardNumber) => {
  const cardRef = cardNumber === 1 ? card1.value : card2.value

  anime({
    targets: cardRef.firstChild, // Target the inner container of the card
    rotateY: '+=180deg', // Flip the card
    easing: 'easeInOutSine', // Smooth transition
    duration: 100, // Animation duration
    elasticity: 900,
  })
}
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.transform-style {
  transform-style: preserve-3d;
}

.card-front, .card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
