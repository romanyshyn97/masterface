<template>
  <section id="comparison" class="py-16 bg-white">
    <div class="container mx-auto ">
      <h2 class="text-3xl font-bold text-center mb-12 text-pastel-peach">Відгуки</h2>

      <Carousel
          :value="comparisons"
          :numVisible="1"
          :numScroll="1"
          :showIndicators="true"
          circular
          class="max-w-xl mx-auto"
          :pt="{
          indicatorButton: ({context}) => ({
            style:{
                backgroundColor: context.highlighted ? 'pink' : 'lightgray',
            },

          }),

        }"
      >
<!--        <template #item="slotProps">-->
<!--          <div class=" bg-gray-100 rounded-lg">-->
<!--            <img-->
<!--                :src="slotProps.data.image"-->
<!--                alt="Before treatment"-->
<!--                class="w-full h-full"-->
<!--            >-->
<!--          </div>-->
<!--        </template>-->
        <template #item="slotProps">
          <div class="border border-surface-200 dark:border-surface-700 rounded-xl shadow-xl m-2  p-4">
            <div class="mb-4">
              <div class="relative mx-auto my-auto">
                <img
                    :src="slotProps.data.image"
                    alt="Before treatment"
                    class="w-full h-full"
                >
              </div>
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
    image: '/assets/images/reviews/review1.PNG',
  },
  {
    image: '/assets/images/reviews/review2.PNG',
  },
  {
    image: '/assets/images/reviews/review3.PNG',
  },
  {
    image: '/assets/images/reviews/review4.PNG',
  },
  {
    image: '/assets/images/reviews/review5.PNG',
  },
  {
    image: '/assets/images/reviews/review6.PNG',
  },
  {
    image: '/assets/images/reviews/review7.PNG',
  },
  {
    image: '/assets/images/reviews/review8.PNG',
  },
];
</script>

<style scoped>

</style>