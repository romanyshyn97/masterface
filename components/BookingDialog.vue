<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const { visible, close } = useBookingDialog()
</script>

<template>
  <Dialog :open="visible" @update:open="(v: boolean) => { if (!v) close() }">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle class="text-center">Бронювання курсу</DialogTitle>
      </DialogHeader>
      <div class="space-y-4 text-center">
        <p class="text-base text-foreground">Ви можете зв'язатись зі мною за допомогою:</p>
        <div class="flex justify-center space-x-6">
          <a
            href="https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            class="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <font-awesome-icon class="h-8" :icon="['fab', 'instagram']" />
          </a>
          <a
            href="https://t.me/+380983693213"
            target="_blank"
            rel="noopener"
            aria-label="Telegram"
            class="text-muted-foreground hover:text-blue-500 transition-colors duration-200"
          >
            <font-awesome-icon class="h-8" :icon="['fab', 'telegram']" />
          </a>
          <a
            href="viber://chat?number=+380983693213"
            aria-label="Viber"
            class="text-muted-foreground hover:text-purple-500 transition-colors duration-200"
          >
            <font-awesome-icon class="h-8" :icon="['fab', 'viber']" />
          </a>
        </div>
        <p class="text-base text-foreground mt-4">Або за номер телефону:</p>
        <a href="tel:+380983693213" class="block text-primary text-xl font-semibold">+380983693213</a>
      </div>
    </DialogContent>
  </Dialog>
</template>
