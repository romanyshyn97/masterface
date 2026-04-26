<script setup lang="ts">
import { computed } from 'vue'
import { Sparkles } from 'lucide-vue-next'
import { motion, useReducedMotion } from 'motion-v'

const items = [
  { text: 'Якщо ви тільки починаєте свій шлях у світі фейс-масажу, цей курс допоможе вам опанувати базові техніки та закласти міцний фундамент для подальшого розвитку.' },
  { text: 'Для тих, хто вже працює у сфері краси, курс пропонує поглиблені техніки та секрети професійного омолодження, які допоможуть вам виділитися серед конкурентів.' },
  { text: 'для масажистів з досвідом, які хочуть удосконалити свої знання та навички' },
  { text: 'для косметологів, які прагнуть нових знань та методів у роботі з клієнтами' },
  { text: 'для тих, хто шукає методи природного омолодження' },
  { text: 'для тих, хто цінує екологічність, природність, натуральність' },
]

const reduced = useReducedMotion()

// Cards reveal in a diagonal cascade — left column slightly before right.
// Even index → left column, odd → right.
const cardEntrance = (i: number) => {
  if (reduced.value) {
    return { initial: false, animate: { opacity: 1, y: 0, rotate: 0, scale: 1 } }
  }
  const fromLeft = i % 2 === 0
  return {
    initial: { opacity: 0, y: 40, scale: 0.92, rotate: fromLeft ? -2 : 2 },
    whileInView: { opacity: 1, y: 0, scale: 1, rotate: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: {
      duration: 0.55,
      delay: i * 0.09,
      ease: [0.22, 1, 0.36, 1],
    },
  }
}

const cardHover = computed(() => reduced.value
  ? {}
  : {
      whileHover: { y: -8, scale: 1.015, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
    },
)

const iconHover = computed(() => reduced.value
  ? {}
  : {
      whileHover: { rotate: 18, scale: 1.15, transition: { type: 'spring', stiffness: 320, damping: 16 } },
    },
)

const headingReveal = computed(() => reduced.value
  ? { initial: false, animate: { opacity: 1, y: 0 } }
  : {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.6 },
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
)
</script>

<template>
  <section id="for-whom" class="py-16 px-4">
    <SectionLabel index="01" label="Для кого" />
    <div class="max-w-4xl mx-auto text-center">
      <div class="mt-8 w-full max-w-screen-xl">
        <iframe
          class="w-full md:w-1/2 max-w-1/2 aspect-video mx-auto rounded-lg shadow-lift"
          src="https://www.youtube.com/embed/Bd0tmu9BLbc?start=35"
          title="Презентація курсу Masterface"
          frameborder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <h4 class="text-primary text-3xl font-display font-semibold text-center mt-8">Онлайн-курс “Омолоджуючий масаж обличчя”</h4>

      <motion.h2
        v-bind="headingReveal"
        class="text-3xl md:text-4xl text-foreground font-display mb-10 mt-8"
      >
        Для кого цей курс?
      </motion.h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <motion.div
          v-for="(item, i) in items"
          :key="i"
          v-bind="{ ...cardEntrance(i), ...cardHover }"
          class="
            group relative overflow-hidden
            bg-card/85 backdrop-blur-sm
            border border-white/70
            p-8 rounded-2xl shadow-soft
            text-left
            transition-shadow duration-300 hover:shadow-lift
            cursor-default
          "
        >
          <!-- Decorative aurora glow per card, only visible on hover -->
          <div
            aria-hidden="true"
            class="
              pointer-events-none absolute -top-1/2 -right-1/2 w-[140%] h-[140%]
              opacity-0 group-hover:opacity-100 transition-opacity duration-500
            "
            :style="{ background: `radial-gradient(circle at 70% 30%, var(--aurora-pink) 0%, transparent 60%)` }"
          />

          <motion.div v-bind="iconHover" class="inline-flex">
            <Sparkles class="w-7 h-7 text-primary mb-4" />
          </motion.div>

          <p class="text-ink/80 leading-relaxed">{{ item.text }}</p>

          <!-- Index numeral, editorial detail -->
          <span class="
            absolute top-4 right-5 font-sans text-[10px] tracking-[0.22em]
            opacity-30 font-medium text-ink uppercase
          ">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
        </motion.div>
      </div>
    </div>
  </section>
</template>
