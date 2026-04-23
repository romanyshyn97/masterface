<script setup lang="ts">
import { Carousel, CarouselItem } from '@/components/ui/carousel'

const reviews = Array.from({ length: 8 }, (_, i) => ({
  src: `/assets/images/reviews/review${i + 1}.PNG`,
}))
</script>

<template>
  <section id="reviews" class="py-16 bg-card">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-display font-semibold text-center mb-12 text-foreground">Відгуки</h2>
      <Carousel class="max-w-xl mx-auto" aria-label="Відгуки учениць">
        <CarouselItem v-for="(r, i) in reviews" :key="i">
          <div class="border border-border rounded-xl shadow-lift m-2 p-4 bg-card">
            <img
              :src="r.src"
              :alt="`Відгук учениці ${i + 1}`"
              width="600"
              height="800"
              loading="lazy"
              decoding="async"
              class="w-full h-full"
            >
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </section>
</template>
