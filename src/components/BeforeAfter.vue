<template>
  <section id="comparison" class="py-16 bg-lavender-mist">
    <div class="container mx-auto ">
      <h2 class="text-3xl font-bold text-center mb-12 text-pastel-peach">До / Після</h2>

      <Carousel
          :value="comparisons"
          :numVisible="1"
          :numScroll="1"
          :showIndicators="true"
          circular
          class="max-w-4xl mx-auto"
          :pt="{
          indicatorButton: ({context}) => ({
            style:{
                backgroundColor: context.highlighted ? 'pink' : 'lightgray',
            },

          }),

        }"
      >
        <template #item="slotProps">
          <div class="relative bg-gray-100 rounded-lg overflow-hidden">
              <div class="absolute top-4 left-4 bg-blush-pink px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                До
              </div>
              <img
                  :src="slotProps.data.image"
                  alt="Before treatment"
                  class="w-full h-full object-cover"
              >
              <div class="absolute top-4 right-4 bg-blush-pink px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                Після
              </div>
          </div>
        </template>

        <template #indicator="slotProps">
          <button class="w-3 h-3 rounded-full transition-colors mx-1"
                  :class="slotProps.highlighted ? 'bg-pastel-peach' : 'bg-gray-300'" />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
import Carousel from 'primevue/carousel';

const comparisons = [
  {
    image: '/assets/images/compares/compare1.JPG',
  },
  {
    image: '/assets/images/compares/compare2.JPG',
  },
  {
    image: '/assets/images/compares/compare3.JPG',
  },
  {
    image: '/assets/images/compares/compare4.PNG',
  },
  {
    image: '/assets/images/compares/compare5.JPG',
  },
  {
    image: '/assets/images/compares/compare6.JPG',
  },
];
</script>

<style scoped>

</style>