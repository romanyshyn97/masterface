<template>
  <div id="course" class="bg-sage-green mx-auto px-4 py-12">
    <div class="w-full md:w-1/2 mx-auto">
      <h3 class="text-logo-pink text-2xl font-bold text-center">Онлайн-курс “Омолоджуючий масаж обличчя”</h3>
      <h2 class="text-center text-xl mb-8">- це твій ключ до професійного зростання та нових можливостей. Ти навчишся дієвим технікам, які вже після першого сеансу дадуть клієнтам помітний результат. Опануй мистецтво природного омолодження та стань затребуваним спеціалістом з високим чеком.</h2>
    <div
        v-for="(step, index) in steps"
        :key="step.title"
        class="mb-16 transition-all duration-500 ease-out"
        :style="`transition-delay: ${index * 100}ms`"
        :class="{
      'opacity-100 translate-y-0': step.isVisible,
      'opacity-0 translate-y-10': !step.isVisible
    }"
        :ref="el => { stepElements[index] = el }"
    >
      <div
          class="flex flex-col md:flex-row items-center md:items-start gap-8"
          :style="`transition-delay: ${index * 100}ms`"
      >
        <div class="w-16 h-16 rounded-full bg-logo-pink text-white flex items-center justify-center text-2xl font-bold shrink-0">
          {{ index + 1 }}
        </div>

        <div class="flex-1">
          <h3 class="text-2xl font-bold mb-4 text-dark-gray">{{ step.title }}</h3>
          <p class="text-gray-600 mb-4" v-html="step.content"></p>

          <div v-if="step.videos" class="mt-6 mx-auto text-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mx-auto">
              <div class="relative w-full" style="padding-bottom: 177.78%"> <!-- 9:16 aspect ratio -->
                <iframe
                    class="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                    src="https://www.youtube.com/embed/32p0kdLfJV8?autoplay=0&mute=1"
                    title="Урок масажу — техніка 1"
                    frameborder="0"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
              </div>

              <div class="relative overflow-hidden rounded-xl shadow-lg aspect-[9/16]">
                <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/NV55gjHCRfg"
                    title="Урок масажу — техніка 2"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
              </div>

              <div class="relative overflow-hidden rounded-xl shadow-lg aspect-[9/16]">
                <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/wxNTMylYazE"
                    title="Урок масажу — техніка 3"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
              </div>

              <div class="relative overflow-hidden rounded-xl shadow-lg aspect-[9/16]">
                <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/EHXA2vppzQs"
                    title="Урок масажу — техніка 4"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
              </div>

              <div class="relative overflow-hidden rounded-xl shadow-lg aspect-[9/16]">
                <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/C7Jyf0Zq5Gs"
                    title="Урок масажу — техніка 5"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
              </div>

              <div class="relative overflow-hidden rounded-xl shadow-lg aspect-[9/16]">
                <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/LBUXHoijC04"
                    title="Урок масажу — техніка 6"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div v-if="index === 6" class="mt-6 ">
            <ul class="list-disc">
              <li>правильно упакуєш свій інстаграм, який буде продавати твої послуги;</li>
              <li>вмітимеш знаходити нових клієнтів;</li>
              <li>навчишся робити кейси, які допожуть збільшити місячний чек.</li>
            </ul>
            </div>
          </div>
      </div>
    </div>

    <!-- Bonus Section -->
    <div
        ref="bonusEl"
        class="p-8 rounded-2xl bg-lavender-mist border-2 border-deep-lavender mt-12 transition-all duration-500"
        :class="bonusVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
    >
      <div class="flex items-center gap-4 mb-4">
        <div class="bg-logo-pink text-white p-3 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round"  stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-dark-gray flex items-center gap-2">
          Бонус
          <Gift class="w-5 h-5 text-primary-500" />
        </h3>
      </div>
      <p class="text-gray-600">Для мене важливо підтримувати спілкування з учнями, тому після навчання. Ви завжди отримаєте зворотній звʼязок!</p>
    </div>
      <div class="flex justify-center">
        <Button size="lg" class="mt-8 mx-auto" @click="openBooking">Забронювати місце</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { Gift } from 'lucide-vue-next'

const { open: openBooking } = useBookingDialog()
const steps = ref([
  {
    title: 'Теоретична підготовка',
    content: 'Для початку ми детально вивчаємо будову шкіри, сполучної тканини, анатомію мʼязів обличчя, масажні лінії, види зморшок та всю необхідну теорію, яка потрібна для якісної роботи.'
  },
  {
    title: 'Діагностика морфотипів',
    content: 'Після того вчимось діагностувати морфотипи старіння... Правильна діагностика - це 50% успіху та отримання результату.'
  },
  {
    title: 'Методична книга',
    content: 'Для засвоєння знань є методична книга, яку можна скачати собі назавжди та перечитувати необмежену кількість разів. В ній зібрана вся необхідна теорія та знання для ефективної роботи.'
  },
  {
    title: 'Масажні техніки',
    content: 'Наступні 6 тижнів ми освоюємо техніки масажу обличчя. Вивчення масажних технік відбувається по детальним відео урокам.',
    videos: ['videoId1', 'videoId2', 'videoId3', 'videoId4', 'videoId5', 'videoId6']
  },
  {
    title: 'Практика та перевірка',
    content: 'Після вивчення кожного блоку передбачена практика. Учні роблять масаж на моделях і я перевіряю правильність виконання.'
  },
  {
    title: 'Сертифікація',
    content: 'Навчання завершується здачею іспиту, після якого видається два сертифікати: українською та англійською мовами.'
  },
  {
    title: 'Маркетинг та просування',
    content: ''
  }
]);

const bonusVisible = ref(false)
const stepElements = ref([])
const bonusEl = ref(null)

onMounted(() => {
  steps.value.forEach((step, index) => {
    if (stepElements.value[index]) {
      useIntersectionObserver(
        stepElements.value[index],
        ([entry]) => { step.isVisible = entry.isIntersecting },
        { threshold: 0.1 },
      )
    }
  })
  if (bonusEl.value) {
    useIntersectionObserver(
      bonusEl,
      ([entry]) => { if (entry.isIntersecting) bonusVisible.value = true },
      { threshold: 0.1 },
    )
  }
})
</script>

<style>
@media (max-width: 768px) {
  .scroll-container {
    scrollbar-width: thin;
    scrollbar-color: #FF66C4 #F8F8F8;
  }

  .scroll-container::-webkit-scrollbar {
    height: 6px;
  }

  .scroll-container::-webkit-scrollbar-track {
    background: #F8F8F8;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background-color: #FF66C4;
    border-radius: 20px;
  }
}
</style>