<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useIntersectionObserver, useMediaQuery } from '@vueuse/core'
import { motion, useReducedMotion } from 'motion-v'
import { Button } from '@/components/ui/button'
import { Gift } from 'lucide-vue-next'

const { open: openBooking } = useBookingDialog()
const reduced = useReducedMotion()

// On screens < lg the scroll-hijack falls back to the regular vertical layout.
// Hijacking on touch devices kills momentum scroll and feels broken.
const hijackEnabled = useMediaQuery('(min-width: 1024px) and (pointer: fine)')

interface Step {
  title: string
  content: string
  videos?: boolean
  bonusList?: string[]
}

const steps = ref<Step[]>([
  {
    title: 'Теоретична підготовка',
    content: 'Для початку ми детально вивчаємо будову шкіри, сполучної тканини, анатомію мʼязів обличчя, масажні лінії, види зморшок та всю необхідну теорію, яка потрібна для якісної роботи.',
  },
  {
    title: 'Діагностика морфотипів',
    content: 'Після того вчимось діагностувати морфотипи старіння. Правильна діагностика — це 50% успіху та отримання результату.',
  },
  {
    title: 'Методична книга',
    content: 'Для засвоєння знань є методична книга, яку можна скачати собі назавжди та перечитувати необмежену кількість разів. В ній зібрана вся необхідна теорія та знання для ефективної роботи.',
  },
  {
    title: 'Масажні техніки',
    content: 'Наступні 6 тижнів ми освоюємо техніки масажу обличчя. Вивчення масажних технік відбувається по детальним відео урокам.',
    videos: true,
  },
  {
    title: 'Практика та перевірка',
    content: 'Після вивчення кожного блоку передбачена практика. Учні роблять масаж на моделях і я перевіряю правильність виконання.',
  },
  {
    title: 'Сертифікація',
    content: 'Навчання завершується здачею іспиту, після якого видається два сертифікати: українською та англійською мовами.',
  },
  {
    title: 'Маркетинг та просування',
    content: 'Останній блок присвячений упаковці інстаграма, пошуку клієнтів та формуванню кейсів, які допоможуть збільшити місячний чек.',
    bonusList: [
      'правильно упакуєш свій інстаграм, який буде продавати твої послуги;',
      'вмітимеш знаходити нових клієнтів;',
      'навчишся робити кейси, які допожуть збільшити місячний чек.',
    ],
  },
])

// All 6 lesson videos shown in step 4 on both desktop and mobile.
const videoUrls = [
  'https://www.youtube.com/embed/32p0kdLfJV8?autoplay=0&mute=1',
  'https://www.youtube.com/embed/NV55gjHCRfg',
  'https://www.youtube.com/embed/wxNTMylYazE',
  'https://www.youtube.com/embed/EHXA2vppzQs',
  'https://www.youtube.com/embed/C7Jyf0Zq5Gs',
  'https://www.youtube.com/embed/LBUXHoijC04',
]

// === Scroll-hijack stage progress ===
const stageRef = ref<HTMLElement | null>(null)
const progress = ref(0)
const activeIndex = computed(() => {
  if (!hijackEnabled.value) return -1
  return Math.min(steps.value.length - 1, Math.floor(progress.value * steps.value.length))
})
const trackTransform = computed(() => {
  if (reduced.value) return ''
  const offset = progress.value * (steps.value.length - 1) * 100
  return `translate3d(-${offset}%, 0, 0)`
})

let rafId = 0
function updateProgress() {
  const el = stageRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const total = el.offsetHeight - window.innerHeight
  if (total <= 0) {
    progress.value = 0
    return
  }
  const scrolled = -rect.top
  progress.value = Math.max(0, Math.min(1, scrolled / total))
}
function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateProgress)
}

// === Bonus block scroll-triggered reveal (still uses observer) ===
const bonusVisible = ref(false)
const bonusEl = ref<HTMLElement | null>(null)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateProgress()

  if (bonusEl.value) {
    useIntersectionObserver(
      bonusEl,
      ([entry]) => { if (entry.isIntersecting) bonusVisible.value = true },
      { threshold: 0.1 },
    )
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div id="course" class="mx-auto px-4 py-12">
    <SectionLabel index="02" label="Про курс" />
    <div class="w-full md:w-1/2 mx-auto text-center">
      <h3 class="text-primary text-2xl font-display font-medium">Онлайн-курс “Омолоджуючий масаж обличчя”</h3>
      <h2 class="text-xl mb-12 text-ink/80 font-display italic">— це твій ключ до професійного зростання та нових можливостей.</h2>
    </div>

    <!-- ============================================================ -->
    <!-- DESKTOP (lg+, fine pointer): horizontal scroll-hijack stage   -->
    <!-- ============================================================ -->
    <section
      v-if="hijackEnabled"
      ref="stageRef"
      aria-label="Кроки програми курсу"
      class="relative hidden lg:block"
      style="height: 480vh"
    >
      <div class="sticky top-0 h-screen overflow-hidden flex flex-col">

        <!-- Top progress strip — pushed below the floating header capsule -->
        <div class="pt-24 px-12 flex items-center gap-5 shrink-0">
          <span class="font-display italic text-sm text-ink shrink-0 leading-none">
            <span class="text-primary">{{ String(activeIndex + 1).padStart(2, '0') }}</span>
            <span class="opacity-40 mx-0.5">/</span>
            <span class="opacity-70">{{ String(steps.length).padStart(2, '0') }}</span>
          </span>
          <div class="flex-1 h-px bg-ink/10 relative overflow-hidden rounded-full">
            <motion.div
              class="absolute inset-y-0 left-0 bg-primary rounded-full"
              :style="{ width: `${(progress * 100).toFixed(1)}%` }"
            />
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <span
              v-for="(_, i) in steps"
              :key="i"
              class="h-1 rounded-full transition-all duration-300"
              :class="i === activeIndex ? 'w-4 bg-primary' : 'w-1 bg-ink/25'"
            />
          </div>
        </div>

        <!-- Horizontal track -->
        <div class="flex-1 relative overflow-hidden">
          <div
            class="flex h-full"
            :style="{ transform: trackTransform, transition: reduced ? 'none' : 'transform 0.18s linear' }"
          >
            <article
              v-for="(step, i) in steps"
              :key="i"
              class="w-screen h-full shrink-0 flex items-center justify-center px-12"
            >
              <div class="max-w-5xl w-full grid grid-cols-12 gap-10 items-center">
                <!-- Big numeral -->
                <div class="col-span-4">
                  <motion.span
                    :animate="i === activeIndex
                      ? { opacity: 1, scale: 1, rotate: 0 }
                      : { opacity: 0.25, scale: 0.92, rotate: -3 }"
                    :transition="{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }"
                    class="block font-display italic font-medium leading-none text-ink"
                    style="font-size: clamp(8rem, 18vw, 16rem)"
                  >
                    {{ String(i + 1).padStart(2, '0') }}
                  </motion.span>
                </div>

                <!-- Text + optional video / bonus list -->
                <div class="col-span-8">
                  <motion.h3
                    :animate="i === activeIndex
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }"
                    :transition="{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }"
                    class="font-display text-4xl xl:text-5xl text-ink leading-tight mb-5"
                  >
                    {{ step.title }}
                  </motion.h3>
                  <motion.p
                    :animate="i === activeIndex
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }"
                    :transition="{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }"
                    class="text-ink/75 text-base leading-relaxed mb-6 max-w-2xl"
                  >
                    {{ step.content }}
                  </motion.p>

                  <!-- Step 4: all 6 lesson videos in a 3×2 grid -->
                  <motion.div
                    v-if="step.videos"
                    :animate="i === activeIndex
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }"
                    :transition="{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }"
                    class="grid grid-cols-3 grid-rows-2 gap-3 max-w-md"
                  >
                    <div
                      v-for="(url, vi) in videoUrls"
                      :key="vi"
                      class="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/70 shadow-soft"
                    >
                      <iframe
                        v-if="i === activeIndex"
                        :src="url"
                        :title="`Урок масажу — техніка ${vi + 1}`"
                        class="absolute inset-0 w-full h-full"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  <!-- Step 7: bonus list -->
                  <motion.ul
                    v-if="step.bonusList"
                    :animate="i === activeIndex
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }"
                    :transition="{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }"
                    class="space-y-2 text-ink/75 text-sm max-w-xl"
                  >
                    <li v-for="b in step.bonusList" :key="b" class="flex gap-3">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      <span>{{ b }}</span>
                    </li>
                  </motion.ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- MOBILE / TABLET fallback: editorial stacked panels             -->
    <!-- (same visual language as desktop hijack, just vertically       -->
    <!-- stacked instead of horizontally pinned)                        -->
    <!-- ============================================================ -->
    <div v-if="!hijackEnabled" class="max-w-2xl mx-auto px-6">
      <motion.article
        v-for="(step, index) in steps"
        :key="step.title"
        :initial="reduced ? false : { opacity: 0, y: 36 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }"
        class="mb-24 last:mb-0"
      >
        <!-- Big Cormorant italic numeral -->
        <span
          class="block font-display italic font-medium leading-none text-ink mb-5"
          style="font-size: clamp(5rem, 22vw, 9rem)"
        >
          {{ String(index + 1).padStart(2, '0') }}
        </span>

        <!-- Title -->
        <h3 class="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
          {{ step.title }}
        </h3>

        <!-- Body -->
        <p class="text-ink/75 text-base leading-relaxed">
          {{ step.content }}
        </p>

        <!-- Step 4: all 6 lesson videos in a 2-col grid -->
        <div v-if="step.videos" class="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            v-for="(url, vi) in videoUrls"
            :key="vi"
            class="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/70 shadow-soft"
          >
            <iframe
              :src="url"
              :title="`Урок масажу — техніка ${vi + 1}`"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <!-- Step 7: bonus list -->
        <ul v-if="step.bonusList" class="mt-6 space-y-2 text-ink/75 text-sm">
          <li v-for="b in step.bonusList" :key="b" class="flex gap-3">
            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
            <span>{{ b }}</span>
          </li>
        </ul>
      </motion.article>
    </div>

    <!-- Bonus block (renders after the steps in both layouts) -->
    <div class="w-full max-w-2xl mx-auto px-6 mt-20">
      <div
        ref="bonusEl"
        class="
          relative overflow-hidden p-8 md:p-12 rounded-3xl
          bg-white/60 backdrop-blur-xl border border-white/70 shadow-lift
          transition-all duration-500
        "
        :class="bonusVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
      >
        <!-- Aurora glow accent in corner -->
        <div
          aria-hidden="true"
          class="absolute -top-1/2 -right-1/3 w-[140%] h-[140%] pointer-events-none"
          :style="{ background: 'radial-gradient(circle at 70% 30%, var(--aurora-pink) 0%, transparent 60%)' }"
        ></div>

        <div class="relative">
          <!-- Eyebrow + thin divider -->
          <div class="flex items-center gap-4 mb-6">
            <span class="font-sans text-[10px] tracking-[0.22em] uppercase font-medium text-primary">
              Bonus · Підтримка після курсу
            </span>
            <div class="flex-1 h-px bg-ink/15"></div>
          </div>

          <!-- Headline + Gift icon -->
          <div class="flex items-baseline gap-5 mb-6">
            <h3 class="font-display italic font-medium text-ink text-5xl md:text-6xl leading-none">
              Бонус
            </h3>
            <div class="
              w-12 h-12 rounded-full
              bg-primary text-primary-foreground
              flex items-center justify-center
              shadow-soft shrink-0
            ">
              <Gift class="w-5 h-5" />
            </div>
          </div>

          <!-- Personal note in italic serif -->
          <p class="font-display italic text-xl md:text-2xl text-ink/85 leading-snug max-w-xl">
            Для мене важливо підтримувати спілкування з учнями, тому після навчання — ви завжди отримаєте зворотній звʼязок.
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <Button size="lg" class="mt-10 mx-auto rounded-full" @click="openBooking">
          Забронювати місце
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .scroll-container {
    scrollbar-width: thin;
    scrollbar-color: #FF66C4 #F8F8F8;
  }
  .scroll-container::-webkit-scrollbar { height: 6px; }
  .scroll-container::-webkit-scrollbar-track { background: #F8F8F8; }
  .scroll-container::-webkit-scrollbar-thumb { background-color: #FF66C4; border-radius: 20px; }
}
</style>
