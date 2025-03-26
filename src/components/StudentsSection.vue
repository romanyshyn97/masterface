<template>
  <section id="comparison" class="py-16 bg-blush-pink">
    <div class="container mx-auto ">
      <h2 class="text-3xl font-bold text-center mb-12 text-pastel-peach">Студенти</h2>

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
            <img
                :src="slotProps.data.image"
                alt="Before treatment"
                class="w-full h-full object-cover"
            >
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
    image: '/assets/images/students/student1.JPG',
  },
  {
    image: '/assets/images/students/student2.JPG',
  },
  {
    image: '/assets/images/students/student3.JPG',
  },
  {
    image: '/assets/images/students/student4.JPG',
  },
  {
    image: '/assets/images/students/student5.JPG',
  },
  {
    image: '/assets/images/students/student6.JPG',
  },
  {
    image: '/assets/images/students/student7.JPG',
  },
  {
    image: '/assets/images/students/student8.JPG',
  },
  {
    image: '/assets/images/students/student9.JPG',
  },
  {
    image: '/assets/images/students/student10.JPG',
  },
  {
    image: '/assets/images/students/student11.JPG',
  },
  {
    image: '/assets/images/students/student12.JPG',
  },
  {
    image: '/assets/images/students/student13.JPG',
  },
  {
    image: '/assets/images/students/student14.JPG',
  },
  {
    image: '/assets/images/students/student15.JPG',
  },
  {
    image: '/assets/images/students/student16.JPG',
  },
  {
    image: '/assets/images/students/student17.JPG',
  },
  {
    image: '/assets/images/students/student18.JPG',
  },
  {
    image: '/assets/images/students/student19.JPG',
  },
  {
    image: '/assets/images/students/student20.PNG',
  },
  {
    image: '/assets/images/students/student21.PNG',
  },
];
</script>

<style scoped>

</style>