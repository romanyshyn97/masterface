<script setup lang="ts">
import { Carousel, CarouselItem } from '@/components/ui/carousel'

const comparisons = [
  { src: '/assets/images/compares/compare1.JPG' },
  { src: '/assets/images/compares/compare2.JPG' },
  { src: '/assets/images/compares/compare3.JPG' },
  { src: '/assets/images/compares/compare4.PNG' },
  { src: '/assets/images/compares/compare5.JPG' },
  { src: '/assets/images/compares/compare6.JPG' },
]
</script>

<template>
  <section id="comparison" class="py-16">
    <SectionLabel index="04" label="Результати" />
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-display font-medium text-center mb-12 text-ink">До / Після</h2>

      <Carousel class="max-w-4xl mx-auto" aria-label="Результати до і після">
        <CarouselItem v-for="(c, i) in comparisons" :key="i">
          <div class="relative bg-muted rounded-lg overflow-hidden">
            <span class="absolute top-4 left-4 bg-card px-3 py-1 rounded-md text-sm font-medium shadow-soft border border-border z-10">До</span>
            <img
              :src="c.src"
              :alt="`Результат до і після ${i + 1}`"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            >
            <span class="absolute top-4 right-4 bg-card px-3 py-1 rounded-md text-sm font-medium shadow-soft border border-border z-10">Після</span>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </section>
</template>
