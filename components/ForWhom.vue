<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'

const items = [
  { text: 'Якщо ви тільки починаєте свій шлях у світі фейс-масажу, цей курс допоможе вам опанувати базові техніки та закласти міцний фундамент для подальшого розвитку.' },
  { text: 'Для тих, хто вже працює у сфері краси, курс пропонує поглиблені техніки та секрети професійного омолодження, які допоможуть вам виділитися серед конкурентів.' },
  { text: 'для масажистів з досвідом, які хочуть удосконалити свої знання та навички' },
  { text: 'для косметологів, які прагнуть нових знань та методів у роботі з клієнтами' },
  { text: 'для тих, хто шукає методи природного омолодження' },
  { text: 'для тих, хто цінує екологічність, природність, натуральність' },
]
</script>

<template>
  <section id="for-whom" class="py-16 px-4 bg-accent">
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
      <h2 class="text-3xl text-foreground font-display mb-8 mt-8">Для кого цей курс?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="bg-card border border-border p-8 rounded-xl shadow-soft hover:shadow-lift transition-shadow"
        >
          <Sparkles class="w-8 h-8 text-primary mb-4" />
          <p class="text-muted-foreground">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
