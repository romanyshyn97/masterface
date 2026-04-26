<script setup lang="ts">
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

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative pt-16 pb-10 px-6 text-ink border-t border-white/40 backdrop-blur-sm">
    <div class="max-w-4xl mx-auto">
      <!-- Brand line -->
      <div class="text-center mb-8">
        <img
            src="~/assets/images/logo-removebg-preview.png"
            alt="Masterface"
            width="160"
            height="48"
            class="w-auto h-11 mx-auto"
        >
        <p class="font-sans text-[10px] tracking-[0.22em] uppercase text-ink/50 font-medium">
          Школа масажу обличчя
        </p>
      </div>

      <!-- Socials -->
      <div class="flex justify-center gap-4 mb-10">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
          :aria-label="s.label"
          class="
            w-14 h-14 rounded-full
            bg-white/60 backdrop-blur-md border border-white/70
            flex items-center justify-center
            text-ink hover:text-primary-foreground hover:bg-primary hover:border-primary
            transition-all duration-200 shadow-soft hover:shadow-lift hover:-translate-y-0.5
          "
        >
          <font-awesome-icon class="text-2xl" :icon="s.icon" />
        </a>
      </div>

      <!-- Phone -->
      <div class="text-center mb-10">
        <p class="text-[10px] tracking-[0.22em] uppercase text-ink/50 font-medium mb-1">
          Зв'язок
        </p>
        <a
          href="tel:+380983693213"
          class="font-display italic text-xl text-primary hover:text-brand-700 transition-colors"
        >
          +380 98 369 32 13
        </a>
      </div>

      <!-- Hairline divider + copyright row -->
      <div class="border-t border-ink/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-[10px] tracking-[0.22em] uppercase text-ink/40 font-medium">
          © {{ year }} · Master Face
        </p>
        <p class="text-[10px] tracking-[0.22em] uppercase text-ink/40 font-medium">
          Всі права захищені
        </p>
      </div>
    </div>
  </footer>
</template>
