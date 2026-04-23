<script setup lang="ts">
import { onMounted } from 'vue'
import anime from 'animejs/lib/anime.es.js'
import { Button } from '@/components/ui/button'
import backgroundImage from '~/assets/images/facemassagemain.jpg'

const { open: openBooking } = useBookingDialog()

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  anime({
    targets: 'h1',
    translateY: [-40, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuad',
  })
  anime({
    targets: 'iframe',
    translateY: [40, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: 500,
  })
})
</script>

<template>
  <div class="relative bg-cover bg-center h-screen" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="absolute inset-0 bg-black/30"></div>
    <div class="relative flex flex-col pt-20 justify-center items-center h-full text-center px-6">
      <h1 class="text-4xl w-full md:w-2/3 md:text-5xl font-bold text-white leading-tight">
        ОПАНУЙ 6 НАЙПОТУЖНІШИХ ЛІФТИНГ - ТЕХНІК ТА СТАНЬ ЕКСПЕРТОМ ПРИРОДНОГО ОМОЛОДЖЕННЯ обличчя!
      </h1>
      <Button size="lg" class="mt-8" @click="openBooking">
        Бронюй зараз зі знижкою 40%
      </Button>
      <div class="text-brand-200 mt-2 text-sm">*стандартна ціна без врахування знижки 500$</div>
    </div>
  </div>
</template>
