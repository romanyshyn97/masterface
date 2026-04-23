<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const menuOpen = ref(false)
const { open: openBooking } = useBookingDialog()

function navigate() { menuOpen.value = false }
</script>

<template>
  <header class="bg-background/85 backdrop-blur-md shadow-soft fixed w-full z-40 border-b border-border flex items-center justify-between px-4 md:px-10 py-2">
    <img src="~/assets/images/logo.png" alt="Masterface" class="w-44 md:w-52" width="208" height="64">

    <div class="flex items-center gap-3">
      <Button @click="openBooking">Забронювати</Button>

      <Sheet v-model:open="menuOpen">
        <Button variant="outline" size="icon" aria-label="Меню" @click="menuOpen = true">
          <Menu class="w-5 h-5 text-primary" />
        </Button>
        <SheetContent side="right" class="flex flex-col">
          <SheetHeader>
            <SheetTitle>Меню</SheetTitle>
          </SheetHeader>
          <nav class="mt-6 flex-1">
            <ul class="text-center font-semibold text-lg">
              <li class="mb-4"><a href="#for-whom" @click="navigate" class="hover:text-primary transition-colors">Для кого</a></li>
              <li class="mb-4"><a href="#course" @click="navigate" class="hover:text-primary transition-colors">Про курс</a></li>
              <li class="mb-4"><a href="#students" @click="navigate" class="hover:text-primary transition-colors">Учні</a></li>
              <li class="mb-4"><a href="#comparison" @click="navigate" class="hover:text-primary transition-colors">Результати</a></li>
              <li class="mb-4"><a href="#reviews" @click="navigate" class="hover:text-primary transition-colors">Відгуки</a></li>
            </ul>
          </nav>
          <div class="flex items-center justify-center pb-4">
            <a
              href="https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk"
              aria-label="Instagram"
              class="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <font-awesome-icon class="h-8" :icon="['fab', 'instagram']" />
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
</template>
