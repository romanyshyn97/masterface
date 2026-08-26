<script setup lang="ts">
import { ref, watch } from 'vue'
import { Check, LoaderCircle } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateBooking } from '@/lib/booking'

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

const name = ref('')
const phone = ref('')
/** Honeypot — hidden from people, irresistible to bots. */
const website = ref('')

const status = ref<'idle' | 'submitting' | 'success'>('idle')
const formError = ref('')
const fieldErrors = ref<{ name?: string, phone?: string }>({})

// Every opening starts from a clean slate, including after a successful send.
watch(visible, (open) => {
  if (!open)
    return
  name.value = ''
  phone.value = ''
  website.value = ''
  status.value = 'idle'
  formError.value = ''
  fieldErrors.value = {}
})

async function submit() {
  if (status.value === 'submitting')
    return

  formError.value = ''
  fieldErrors.value = {}

  const validation = validateBooking({
    name: name.value,
    phone: phone.value,
    website: website.value,
  })

  if (!validation.ok) {
    if (validation.field === 'website')
      formError.value = validation.message
    else
      fieldErrors.value = { [validation.field]: validation.message }
    return
  }

  status.value = 'submitting'

  try {
    await $fetch('/api/booking', {
      method: 'POST',
      body: { name: name.value, phone: phone.value, website: website.value },
    })
    status.value = 'success'
  }
  catch (error: any) {
    status.value = 'idle'
    formError.value = error?.data?.message
      || 'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть у месенджер.'
  }
}
</script>

<template>
  <Dialog :open="visible" @update:open="(v: boolean) => { if (!v) close() }">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle class="text-center font-display italic text-3xl text-ink">
          Бронювання курсу
        </DialogTitle>
      </DialogHeader>

      <div class="space-y-6 pt-2">
        <!-- Success replaces the form; the contacts below stay visible either way. -->
        <div v-if="status === 'success'" class="text-center space-y-3 py-2">
          <div class="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Check class="w-7 h-7 text-primary" />
          </div>
          <p class="font-display italic text-2xl text-ink">
            Дякую за заявку!
          </p>
          <p class="text-base text-ink/70">
            Я зв'яжуся з вами найближчим часом.
          </p>
        </div>

        <form v-else class="space-y-4" novalidate @submit.prevent="submit">
          <p class="text-center text-base text-ink/70">
            Залиште контакти — я зв'яжуся з вами
          </p>

          <div class="space-y-1.5">
            <label for="booking-name" class="block text-xs tracking-[0.14em] uppercase text-ink/50 font-medium">
              Ім'я
            </label>
            <Input
              id="booking-name"
              v-model="name"
              name="name"
              autocomplete="name"
              placeholder="Ваше ім'я"
              :disabled="status === 'submitting'"
              :aria-invalid="!!fieldErrors.name"
              :aria-describedby="fieldErrors.name ? 'booking-name-error' : undefined"
              :class="fieldErrors.name ? 'border-destructive' : ''"
            />
            <p v-if="fieldErrors.name" id="booking-name-error" class="text-sm text-destructive">
              {{ fieldErrors.name }}
            </p>
          </div>

          <div class="space-y-1.5">
            <label for="booking-phone" class="block text-xs tracking-[0.14em] uppercase text-ink/50 font-medium">
              Телефон
            </label>
            <Input
              id="booking-phone"
              v-model="phone"
              name="phone"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              placeholder="0XX XXX XX XX"
              :disabled="status === 'submitting'"
              :aria-invalid="!!fieldErrors.phone"
              :aria-describedby="fieldErrors.phone ? 'booking-phone-error' : undefined"
              :class="fieldErrors.phone ? 'border-destructive' : ''"
            />
            <p v-if="fieldErrors.phone" id="booking-phone-error" class="text-sm text-destructive">
              {{ fieldErrors.phone }}
            </p>
          </div>

          <!-- Honeypot: off-screen rather than display:none, which bots skip. -->
          <div class="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
            <label for="booking-website">Website</label>
            <input
              id="booking-website"
              v-model="website"
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
            >
          </div>

          <p v-if="formError" class="text-sm text-destructive text-center" role="alert">
            {{ formError }}
          </p>

          <Button
            type="submit"
            size="lg"
            class="w-full"
            :disabled="status === 'submitting'"
          >
            <LoaderCircle v-if="status === 'submitting'" class="animate-spin" />
            {{ status === 'submitting' ? 'Надсилаю…' : 'Забронювати' }}
          </Button>
        </form>

        <div class="space-y-4 text-center">
          <div class="flex items-center gap-3">
            <span class="h-px flex-1 bg-border" />
            <span class="text-xs tracking-[0.18em] uppercase text-ink/50 font-medium">
              або напишіть мені
            </span>
            <span class="h-px flex-1 bg-border" />
          </div>

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
