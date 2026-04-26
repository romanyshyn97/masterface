<script setup lang="ts">
import { computed } from 'vue'
import { Wifi, Infinity, Award } from 'lucide-vue-next'
import { motion, useReducedMotion } from 'motion-v'
import { Button } from '@/components/ui/button'
import { scrollToHash } from '@/lib/scroll'

const { open: openBooking } = useBookingDialog()
const reduced = useReducedMotion()

const trustPills = [
  { icon: Wifi, label: 'Онлайн навчання' },
  { icon: Infinity, label: 'Доступ назавжди' },
  { icon: Award, label: 'Сертифікат' },
]

// Stagger sequence — 6 children (5 text + image), 60ms delay between.
const reveals = computed(() => Array.from({ length: 6 }, (_, i) => reduced.value
  ? { initial: false, animate: { opacity: 1, y: 0 } }
  : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
    },
))

const imageReveal = computed(() => reduced.value
  ? { initial: false, animate: { opacity: 1, x: 0, scale: 1 } }
  : {
      initial: { opacity: 0, x: 24, scale: 0.98 },
      animate: { opacity: 1, x: 0, scale: 1 },
      transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
    },
)

// Mobile floating decoration — fades + drops in from above with a tiny rotation settle.
const watermarkReveal = computed(() => reduced.value
  ? { initial: false, animate: { opacity: 1, y: 0, rotate: 3 } }
  : {
      initial: { opacity: 0, y: -20, rotate: 0 },
      animate: { opacity: 1, y: 0, rotate: 3 },
      transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
)
</script>

<template>
  <section class="relative min-h-svh w-full flex items-center pt-28 pb-16 px-6 md:px-10 lg:px-16 overflow-hidden">

    <!-- Mobile / tablet floating decoration — small editorial inset of abstract1 -->
    <motion.figure
      v-bind="watermarkReveal"
      class="
        lg:hidden absolute top-24 right-4 sm:right-8 z-10
        w-28 sm:w-32 aspect-[3/4]
        rotate-3
        rounded-2xl overflow-hidden
        shadow-lift border border-white/70
        bg-white/40 backdrop-blur-sm
      "
    >
      <img
        src="~/assets/images/abstract1.jpeg"
        alt="Ілюстрація ліфтинг-масажу обличчя"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      >
    </motion.figure>

    <div class="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">

      <!-- Left column: copy + CTAs + trust pills -->
      <div class="text-center lg:text-left">
        <motion.p
          v-bind="reveals[0]"
          class="font-sans uppercase tracking-[0.22em] text-ink/65 text-xs md:text-sm"
        >
          Онлайн-курс
        </motion.p>

        <motion.h1
          v-bind="reveals[1]"
          class="font-display font-medium text-ink text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mt-6"
        >
          Опануй 6 найпотужніших ліфтинг-технік та стань експертом природного омолодження <em class="italic font-medium text-brand-700">обличчя</em>!
        </motion.h1>

        <motion.div
          v-bind="reveals[2]"
          class="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
        >
          <Button size="lg" class="rounded-full" @click="openBooking">
            Бронюй зараз зі знижкою 40%
          </Button>
          <Button
            size="lg"
            variant="outline"
            class="rounded-full"
            @click="scrollToHash('#course')"
          >
            Дивитись програму
          </Button>
        </motion.div>

        <motion.p
          v-bind="reveals[3]"
          class="text-ink/55 text-xs mt-3"
        >
          *стандартна ціна без врахування знижки 500$
        </motion.p>

        <motion.div
          v-bind="reveals[4]"
          class="mt-10 md:mt-12 flex flex-wrap justify-center lg:justify-start gap-3"
        >
          <span
            v-for="pill in trustPills"
            :key="pill.label"
            class="inline-flex items-center gap-2 bg-white/55 backdrop-blur-md border border-white/70 text-ink text-sm px-4 py-1.5 rounded-full"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
            <component :is="pill.icon" class="w-4 h-4" />
            {{ pill.label }}
          </span>
        </motion.div>
      </div>

      <!-- Right column: abstract1 as a card — desktop (lg+) only -->
      <motion.figure
        v-bind="imageReveal"
        class="
          hidden lg:block relative mx-auto w-full max-w-none
          rounded-3xl overflow-hidden
          shadow-lift border border-white/70
          bg-white/40 backdrop-blur-sm
        "
      >
        <img
          src="~/assets/images/abstract1.jpeg"
          alt="Ілюстрація ліфтинг-масажу обличчя"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-cover aspect-[3/4]"
        >
      </motion.figure>

    </div>
  </section>
</template>
