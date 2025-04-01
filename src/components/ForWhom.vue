<template>
  <section id="for-whom" class="py-16 px-4 bg-lavender-mist">
    <div class="max-w-4xl mx-auto text-center">
      <div class="mt-8 w-full max-w-screen-xl">
        <iframe
            class="w-full md:w-1/2 max-w-1/2 aspect-video mx-auto rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/Bd0tmu9BLbc?start=35"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
      </div>
      <h4 class="text-logo-pink text-3xl font-bold text-center mt-8">Онлайн-курс “Омолоджуючий масаж обличчя”</h4>
      <h2 class="text-3xl text-dark-gray font-lora mb-8 mt-8">Для кого цей курс?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Card 1 -->
        <div v-for="item in items" class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <i class="pi pi-star text-4xl text-logo-pink mb-4" style="font-size: 2.0rem"></i>
          <p class="text-gray-600">
            {{item.text}}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const items = [
  {
    text: 'Якщо ви тільки починаєте свій шлях у світі фейс-масажу, цей курс допоможе вам опанувати базові техніки та закласти міцний фундамент для подальшого розвитку.'
  },
  {
    text: 'Для тих, хто вже працює у сфері краси, курс пропонує поглиблені техніки та секрети професійного омолодження, які допоможуть вам виділитися серед конкурентів.'
  },
  {
    text: 'для масажистів з досвідом, які хочуть удосконалити свої знання та навички'
  },
  {
    text: 'для косметологів, які прагнуть нових знань та методів у роботі з клієнтами'
  },
  {
    text: 'для тих, хто шукає методи природного омолодження'
  },
  {
    text: 'для тих, хто цінує екологічність, природність, натуральність'
  },
]






</script>

<style>
/* Add hover effect for cards */
.hover\:shadow-xl:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>