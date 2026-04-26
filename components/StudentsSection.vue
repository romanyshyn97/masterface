<script setup lang="ts">
import { Carousel, CarouselItem } from '@/components/ui/carousel'

const students = Array.from({ length: 21 }, (_, i) => {
  const n = i + 1
  const ext = n >= 20 ? 'PNG' : 'JPG'
  return { src: `/assets/images/students/student${n}.${ext}` }
})
</script>

<template>
  <section id="students" class="py-16">
    <SectionLabel index="03" label="Учні" />
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-display font-medium text-center mb-12 text-ink">Студенти</h2>
      <Carousel class="max-w-4xl mx-auto" aria-label="Студенти курсу">
        <CarouselItem v-for="(s, i) in students" :key="i">
          <div class="relative bg-muted rounded-lg overflow-hidden">
            <img
              :src="s.src"
              :alt="`Робота студентки ${i + 1}`"
              width="800"
              height="800"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            >
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </section>
</template>
