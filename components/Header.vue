<script setup lang="ts">
import { computed } from 'vue'
import { useScroll, useMediaQuery } from '@vueuse/core'
import { motion, useReducedMotion } from 'motion-v'
import { Button } from '@/components/ui/button'
import { scrollToHash } from '@/lib/scroll'

const navLinks = [
  { id: 'for-whom',   label: 'Для кого' },
  { id: 'course',     label: 'Про курс' },
  { id: 'students',   label: 'Учні' },
  { id: 'comparison', label: 'Результати' },
  { id: 'reviews',    label: 'Відгуки' },
]

const DOCK_THRESHOLD = 120

const reduced = useReducedMotion()
const { open: openBooking } = useBookingDialog()
const activeSection = useActiveSection(navLinks.map(l => l.id))

const { y } = useScroll(import.meta.client ? window : null)
const isDesktop = useMediaQuery('(min-width: 768px)')

// docked = right-edge half-pill (both mobile and desktop dock once scrolled)
const docked = computed(() => y.value > DOCK_THRESHOLD)

// On mobile, dots only show in the docked state (centered = logo only).
// On desktop, dots never show — text nav is always visible.
const showDots = computed(() => !isDesktop.value && docked.value)
const showTextNav = computed(() => isDesktop.value)

// Booking CTA hides in the centered mobile state (logo-only minimal); shows everywhere else.
const showCta = computed(() => isDesktop.value || docked.value)

function go(id: string) {
  scrollToHash('#' + id)
}

const mountReveal = computed(() => reduced.value
  ? { initial: false, animate: { opacity: 1, y: 0 } }
  : {
      initial: { opacity: 0, y: -16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
)

const layoutSpring = { type: 'spring', stiffness: 280, damping: 28 }
</script>

<template>
  <motion.div
    v-bind="mountReveal"
    layout
    :transition="layoutSpring"
    class="
      fixed top-3 z-50 backdrop-blur-xl
      bg-white/55 border border-white/70
      flex items-center
    "
    :class="docked
      ? 'right-0 w-1/2 min-w-[280px] max-w-[760px] justify-between gap-3 pl-3 pr-1.5 py-1.5 rounded-l-full rounded-r-none shadow-capsule-docked'
      : 'left-1/2 -translate-x-1/2 gap-5 pl-3 pr-2 py-1.5 rounded-full shadow-capsule'"
  >
    <a
      href="#"
      aria-label="Masterface — повернутись на початок"
      class="shrink-0"
      @click.prevent="scrollToHash('')"
    >
      <img
        src="~/assets/images/logo-removebg-preview.png"
        alt="Masterface"
        width="160"
        height="48"
        class="w-auto"
        :class="docked ? 'h-7 md:h-8' : 'h-9'"
      >
    </a>

    <!-- Mobile docked: dot indicators -->
    <div v-if="showDots" class="flex items-center gap-2 px-1 flex-1 justify-center">
      <button
        v-for="link in navLinks"
        :key="link.id"
        type="button"
        :aria-label="link.label"
        :title="link.label"
        class="
          group relative h-1.5 rounded-full
          transition-all duration-200 ease-out cursor-pointer
        "
        :class="activeSection === link.id
          ? 'w-5 bg-primary'
          : 'w-1.5 bg-ink/30 hover:bg-ink/50'"
        @click="go(link.id)"
      >
        <span
          class="
            pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2
            bg-ink text-canvas text-[10px] tracking-wide px-2 py-1 rounded
            whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100
            transition-opacity duration-150
          "
        >
          {{ link.label }}
        </span>
      </button>
    </div>

    <!-- Desktop: text nav links (always, both centered and docked states) -->
    <nav v-else-if="showTextNav" class="flex items-center gap-1">
      <a
        v-for="link in navLinks"
        :key="link.id"
        :href="`#${link.id}`"
        class="relative px-2.5 py-1.5 text-xs font-medium transition-colors"
        :class="activeSection === link.id ? 'text-primary' : 'text-ink/75 hover:text-ink'"
        @click.prevent="go(link.id)"
      >
        {{ link.label }}
        <motion.span
          v-if="activeSection === link.id"
          layout-id="active-nav-indicator"
          class="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
          :transition="{ type: 'spring', stiffness: 380, damping: 30 }"
        />
      </a>
    </nav>

    <Button
      v-if="showCta"
      class="rounded-full font-medium shrink-0"
      :class="docked ? 'px-3 py-1.5 text-[11px]' : 'px-4 py-2 text-xs'"
      @click="openBooking"
    >
      {{ docked ? 'Бронюй' : 'Забронювати' }}
    </Button>
  </motion.div>
</template>
