<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const { visible, close } = useBookingDialog()

const socials = [
  {
    href: 'https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk',
    label: 'Instagram',
    icon: ['fab', 'instagram'],
  },
  {
    href: 'https://t.me/+380983693213',
    label: 'Telegram',
    icon: ['fab', 'telegram'],
  },
  {
    href: 'viber://chat?number=+380983693213',
    label: 'Viber',
    icon: ['fab', 'viber'],
  },
]
</script>

<template>
  <Dialog :open="visible" @update:open="(v: boolean) => { if (!v) close() }">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle class="text-center font-display italic text-3xl text-ink">
          Бронювання курсу
        </DialogTitle>
      </DialogHeader>
      <div class="space-y-6 text-center pt-2">
        <p class="text-base text-ink/70">Зв'яжіться зі мною зручним для вас способом</p>

        <div class="flex justify-center gap-4">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.label"
            class="
              group w-16 h-16 rounded-full
              bg-white/60 backdrop-blur-md border border-white/70
              flex items-center justify-center
              text-ink hover:text-primary-foreground hover:bg-primary hover:border-primary
              transition-all duration-200 shadow-soft hover:shadow-lift hover:-translate-y-0.5
            "
          >
            <font-awesome-icon class="text-3xl" :icon="s.icon" />
          </a>
        </div>

        <div class="pt-2">
          <p class="text-xs tracking-[0.18em] uppercase text-ink/50 font-medium mb-2">
            Або за номером телефону
          </p>
          <a
            href="tel:+380983693213"
            class="block font-display italic text-2xl text-primary hover:text-brand-700 transition-colors"
          >
            +380 98 369 32 13
          </a>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
