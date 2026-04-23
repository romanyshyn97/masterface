<template>
  <section class="py-12 bg-gray-100">
    <h2 class="text-center text-3xl font-bold mb-6">Відгуки</h2>
    <div class="relative w-full max-w-3xl mx-auto">
      <div class="overflow-hidden rounded-lg shadow-lg">
        <div
            class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
              class="w-full flex-none p-6 bg-white rounded-lg shadow-lg"
              v-for="(review, index) in reviews"
              :key="index"
              @mouseenter="animateIn(index)"
              @mouseleave="animateOut(index)"
          >
            <h3 class="text-lg font-semibold">{{ review.name }}</h3>
            <p class="mt-2 text-sm text-gray-700">{{ review.text }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="absolute inset-y-0 left-0 flex items-center">
        <button @click="prev" class="bg-gray-800 text-white p-2 rounded-l-lg hover:bg-gray-700">
          &lt;
        </button>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <button @click="next" class="bg-gray-800 text-white p-2 rounded-r-lg hover:bg-gray-700">
          &gt;
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import anime from 'animejs/lib/anime.es.js'

// Sample reviews
const reviews = ref([
  {
    name: 'John Doe',
    text: 'This course was amazing! I learned so much about Vue.js and its ecosystem.',
  },
  {
    name: 'Jane Smith',
    text: 'A fantastic introduction to frontend development. Highly recommend it!',
  },
  {
    name: 'Alice Johnson',
    text: 'Great experience! The instructors were very knowledgeable and helpful.',
  },
  {
    name: 'Bob Brown',
    text: 'I loved the hands-on projects. They really helped solidify my understanding!',
  },
])

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % reviews.value.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + reviews.value.length) % reviews.value.length
}

// Animation for reviews
const animateIn = (index) => {
  anime({
    targets: `.review-${index}`,
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 300,
    easing: 'easeOutExpo',
  })
}

const animateOut = (index) => {
  anime({
    targets: `.review-${index}`,
    opacity: [1, 0],
    translateY: [0, -20],
    duration: 300,
    easing: 'easeInExpo',
  })
}
</script>

<style scoped>
.review {
  opacity: 0; /* Start hidden for animation */
}
</style>
