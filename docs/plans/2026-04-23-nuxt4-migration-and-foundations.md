# Masterface — Nuxt 4 Migration + Phase 1 Foundations

> **For agentic workers:** Implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This project has no automated test suite; verification = dev server + production build + manual visual check.

---

## ⚠ Amendment 2026-04-23 — PrimeVue out, shadcn-vue + Embla in

After landing the original Phase 1, decided to fully remove PrimeVue rather than keep it for "progressive removal". Reasoning: adding `@primevue/nuxt-module` + a custom brand preset = installing infrastructure for code we plan to delete in 2–3 phases.

**Removed from stack:** `primevue`, `@primevue/nuxt-module`, `@primeuix/themes`, `primeicons`, `themes/primevue.ts`, the PrimeVue config block in `nuxt.config.ts`, and the `@import 'primeicons/primeicons.css'` line.

**Added to stack:**
- `reka-ui` — headless interactive primitives (focus trap, ESC, scroll lock, ARIA)
- `class-variance-authority`, `clsx`, `tailwind-merge` — shadcn-vue's variant + class merge helpers
- `embla-carousel-vue` — touch-friendly carousel (used by Apple/Vercel marketing pages)

**Approach:** scaffold via the shadcn-vue CLI (`init` + `add button dialog sheet`). Components are copied into `components/ui/` (we own them, no external dep beyond Reka). Embla wrapper handcrafted in `components/ui/carousel/`.

**Token convention swap:** Restructure `assets/css/index.css` to use shadcn-vue semantic tokens (`--color-background`, `--color-foreground`, `--color-primary`, `--color-card`, `--color-muted`, `--color-border`, `--color-ring`, etc.) so copy-pasted shadcn components work without translation. Brand pink scale moves to `--color-brand-50..900`. Legacy aliases (`logo-pink`, `lavender-mist`, etc.) preserved during migration.

**Estimated bundle savings:** ~150kB JS + ~600kB primeicons fonts removed → ~22kB JS added (Reka + Embla). Net **~730kB lighter** initial load.

The rest of this plan still applies for Nuxt migration, fonts, Lucide, motion-v installation, image hardening, bug fixes, and shared `BookingDialog`. Ignore the original Tasks 5 (PrimeVue preset) and the PrimeVue parts of Tasks 10–12. New work captured in tasks at the bottom of the file under "Amendment Tasks".

---

**Goal:** Migrate the existing Vue 3 + Vite SPA to Nuxt 4 (SSG-ready, Vercel-deployable) and lay down the redesign foundations: Tailwind 4 design tokens, Playfair Display + Inter fonts, Lucide icons, motion-v installed, **shadcn-vue + Embla as the component layer**, and pre-existing bugs fixed. No visual redesign work yet — the page should look essentially identical after Phase 1, just on a future-proof stack.

**Architecture:**
- Nuxt 4 with file-system routing (single home page → `app.vue`).
- SSG via `nuxt generate` for Vercel deploy (free static hosting, perfect SEO for a marketing landing).
- Tailwind 4 via `@tailwindcss/vite` plugin (no `tailwind.config.js`, no PostCSS — CSS-first `@theme` block).
- PrimeVue retained via `@primevue/nuxt-module` with a custom Aura preset; will be progressively replaced in later phases.
- `motion-v` installed and ready (no usage yet — replaces animejs in later phases).
- Lucide icons replace emoji + decorative pi-icons used as content icons.

**Tech Stack (target):**
- nuxt 4.4.x
- vue 3.5.x (provided by Nuxt)
- tailwindcss 4.2.x + @tailwindcss/vite 4.2.x
- @nuxt/fonts 0.14.x
- @primevue/nuxt-module 4.5.x + primevue 4.5.x + @primeuix/themes 2.0.x
- lucide-vue-next 1.0.x
- motion-v 2.2.x
- @vueuse/core (kept)
- @fortawesome/* (kept — used for brand icons in Header / footer / dialogs)
- animejs (kept for now — used by `MainSection`; will be removed in Phase 2)
- vue-burger-menu, vue-router (REMOVED — not used; Nuxt provides routing)

---

## File Structure (after Phase 1)

```
masterface/
├── app.vue                           # ← from src/App.vue
├── nuxt.config.ts                    # NEW (replaces vite.config.js + main.js wiring)
├── package.json                      # UPDATED deps + scripts
├── tsconfig.json                     # NEW (Nuxt-generated)
├── components/                       # ← from src/components/ (auto-imported)
│   ├── BookingDialog.vue             # NEW (shared, replaces 3 inline copies)
│   ├── Header.vue
│   ├── MainSection.vue
│   ├── ForWhom.vue
│   ├── Courses.vue
│   ├── StudentsSection.vue
│   ├── BeforeAfter.vue
│   ├── Review.vue
│   ├── FooterSection.vue
│   └── icons/                        # kept (unused but harmless)
├── composables/
│   └── useBookingDialog.ts           # NEW (shared visibility state)
├── plugins/
│   ├── fontawesome.client.ts         # ← from src/fontawesome.js
│   └── primevue-preset.ts            # NEW (Aura preset themed to brand pink)
├── assets/
│   ├── css/
│   │   └── index.css                 # ← from src/assets/css/index.css (rewritten for Tailwind 4)
│   └── images/                       # ← from src/assets/images/
├── public/
│   ├── favicon.ico                   # kept
│   └── assets/images/                # kept (referenced by absolute paths in carousels)
├── docs/
│   └── plans/
│       └── 2026-04-23-nuxt4-migration-and-foundations.md   # this file
└── .gitignore                        # UPDATED (add .nuxt, .output, .data)

REMOVED:
├── src/                              # entire folder (contents migrated)
├── index.html                        # Nuxt generates HTML
├── vite.config.js                    # Nuxt has its own Vite
├── postcss.config.js                 # Tailwind 4 doesn't need PostCSS
├── tailwind.config.js                # Tailwind 4 uses CSS @theme
├── jsconfig.json                     # Nuxt generates tsconfig.json
```

**Why these splits:**
- `BookingDialog.vue` + `useBookingDialog.ts` co-locate UI and shared state — the dialog is opened from 3 different components today (Header, MainSection, Courses) with copy-pasted markup.
- `plugins/primevue-preset.ts` keeps theme config out of `nuxt.config.ts` (it's ~40 lines).
- `assets/css/index.css` keeps font + token definitions in one place — Tailwind 4 reads `@theme` from any imported CSS.

---

## Task 1: Snapshot baseline (verify clean working tree)

**Files:** none

- [ ] **Step 1.1: Verify clean working tree**

```bash
git status
```

Expected: `nothing to commit, working tree clean`. If dirty, stop and ask user how to proceed.

- [ ] **Step 1.2: Note current commit for rollback reference**

```bash
git rev-parse HEAD
```

Record the SHA. Rollback during this plan = `git reset --hard <sha>`.

---

## Task 2: Update `package.json` with Nuxt 4 stack

**Files:**
- Modify: `package.json`

- [ ] **Step 2.1: Replace `package.json` contents**

```json
{
  "name": "masterface",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.6.0",
    "@fortawesome/free-brands-svg-icons": "^6.6.0",
    "@fortawesome/free-solid-svg-icons": "^6.6.0",
    "@fortawesome/vue-fontawesome": "^3.0.8",
    "@nuxt/fonts": "^0.14.0",
    "@primeuix/themes": "^2.0.3",
    "@primevue/nuxt-module": "^4.5.5",
    "@vueuse/core": "^13.0.0",
    "@vueuse/nuxt": "^13.0.0",
    "animejs": "^3.2.2",
    "lucide-vue-next": "^1.0.0",
    "motion-v": "^2.2.1",
    "nuxt": "^4.4.2",
    "primeicons": "^7.0.0",
    "primevue": "^4.5.5",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.2.4",
    "tailwindcss": "^4.2.4"
  }
}
```

**Removed:**
- `@primevue/themes` (replaced by `@primeuix/themes` already present)
- `vue-burger-menu` (unused)
- `vue-router` (Nuxt provides routing)
- `@vitejs/plugin-vue`, `vite`, `autoprefixer`, `postcss` (Nuxt + Tailwind 4 handle these)

- [ ] **Step 2.2: Delete `package-lock.json` and `node_modules` for clean install**

```bash
rm -rf node_modules package-lock.json
```

- [ ] **Step 2.3: Install**

```bash
npm install
```

Expected: completes without errors. Some peer-dep warnings are OK.

---

## Task 3: Create `nuxt.config.ts`

**Files:**
- Create: `nuxt.config.ts`

- [ ] **Step 3.1: Write `nuxt.config.ts`**

```ts
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
  ],

  css: ['~/assets/css/index.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: 'Playfair Display', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600, 700] },
    ],
  },

  primevue: {
    options: {
      theme: {
        preset: 'masterfacePreset',
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    },
  },

  app: {
    head: {
      title: 'Masterface — Курс ліфтинг-масажу обличчя',
      htmlAttrs: { lang: 'uk' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Опануй 6 ліфтинг-технік природного омолодження обличчя. Онлайн-курс від Каріни.' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ],
    },
  },

  nitro: {
    preset: 'static',
  },
})
```

**Notes:**
- `nitro.preset: 'static'` makes `npm run build` produce a fully static site for Vercel free.
- The PrimeVue preset reference `'masterfacePreset'` will be wired in Task 5 (string is a placeholder; we'll switch to importing the preset object once the file exists).

---

## Task 4: Migrate file structure (move src/ → Nuxt layout)

**Files:**
- Move: `src/App.vue` → `app.vue`
- Move: `src/components/*` → `components/*`
- Move: `src/assets/*` → `assets/*`
- Delete: `src/main.js`, `src/router/`, `src/views/`, `src/utils/loadImages.js`, `src/fontawesome.js`, `src/`
- Delete: `index.html`, `vite.config.js`, `postcss.config.js`, `tailwind.config.js`, `jsconfig.json`

- [ ] **Step 4.1: Move components**

```bash
mkdir -p components
git mv src/components/* components/
```

- [ ] **Step 4.2: Move assets**

```bash
mkdir -p assets
git mv src/assets/css assets/css
git mv src/assets/images assets/images
```

- [ ] **Step 4.3: Move App.vue → app.vue**

```bash
git mv src/App.vue app.vue
```

- [ ] **Step 4.4: Delete obsolete files**

```bash
git rm -rf src/main.js src/router src/views src/utils src/fontawesome.js
git rm index.html vite.config.js postcss.config.js tailwind.config.js jsconfig.json
rmdir src 2>/dev/null || true
```

- [ ] **Step 4.5: Verify directory structure**

```bash
ls -la
ls components/
ls assets/
```

Expected: `app.vue`, `nuxt.config.ts`, `package.json` at root; `components/` has all .vue files; `assets/css/index.css` exists.

---

## Task 5: Create PrimeVue preset plugin

**Files:**
- Create: `plugins/primevue-preset.ts`
- Modify: `nuxt.config.ts` (replace string preset with imported preset)

- [ ] **Step 5.1: Create `plugins/primevue-preset.ts`**

```ts
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const masterfacePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#FFF1F8',
      100: '#FFE0F0',
      200: '#FFC2E0',
      300: '#FF9DCD',
      400: '#FF7FC1',
      500: '#FF66C4',  // brand
      600: '#EF4DB4',
      700: '#DB2777',
      800: '#A8195C',
      900: '#7A0F44',
      950: '#4A0727',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
      },
    },
  },
})

export default defineNuxtPlugin(() => {
  // preset is consumed via nuxt.config.ts options below; this file exists for the export
})
```

- [ ] **Step 5.2: Wire preset in `nuxt.config.ts`**

Replace the `primevue:` block in `nuxt.config.ts` with:

```ts
  primevue: {
    importTheme: { from: '~/plugins/primevue-preset.ts' },
    options: {
      theme: {
        preset: 'masterfacePreset',
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    },
  },
```

**Note:** `@primevue/nuxt-module` accepts `importTheme` to lazy-import the preset object by name from a file — this avoids loading the theme on the server hot path.

---

## Task 6: Create FontAwesome plugin

**Files:**
- Create: `plugins/fontawesome.client.ts`

- [ ] **Step 6.1: Write `plugins/fontawesome.client.ts`**

```ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faInstagram, faTelegram, faViber)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
```

The `.client.ts` suffix runs only in the browser (FontAwesome's library has SSR quirks; client-only is safest and acceptable since icons are decorative).

---

## Task 7: Rewrite `assets/css/index.css` for Tailwind 4 + design tokens

**Files:**
- Modify: `assets/css/index.css`

- [ ] **Step 7.1: Replace file contents**

```css
@import 'tailwindcss';
@import 'primeicons/primeicons.css';

/* ─── Design tokens (Tailwind 4 CSS-first config) ─── */
@theme {
  /* Brand */
  --color-primary-50:  #FFF1F8;
  --color-primary-100: #FFE0F0;
  --color-primary-200: #FFC2E0;
  --color-primary-300: #FF9DCD;
  --color-primary-400: #FF7FC1;
  --color-primary-500: #FF66C4;
  --color-primary-600: #EF4DB4;
  --color-primary-700: #DB2777;
  --color-primary-800: #A8195C;
  --color-primary-900: #7A0F44;

  /* Accents (from redesign spec) */
  --color-accent-500: #8B5CF6;

  /* Surface / canvas */
  --color-surface-canvas:    #FDF8F5;  /* warm off-white page bg */
  --color-surface-soft:      #FBF1EE;  /* alternate band */
  --color-surface-card:      #FFFFFF;
  --color-text-primary:      #1F1428;
  --color-text-muted:        #6B5B6E;
  --color-border-hairline:   #F1E4EC;

  /* Legacy color aliases (kept so existing components keep rendering during migration) */
  --color-logo-pink:       #FF66C4;
  --color-soft-peach:      #FFF3EB;
  --color-lavender-mist:   #F5F0FF;
  --color-sage-green:      #E0F0E5;
  --color-blush-pink:      #FFE8F0;
  --color-deep-lavender:   #D4C2FC;
  --color-muted-teal:      #88C9B9;
  --color-neutral-gray:    #F8F8F8;
  --color-dark-gray:       #4A4A4A;
  --color-pastel-peach:    #FFD4B8;  /* fixes the broken text-pastel-peach references */

  /* Typography */
  --font-display: 'Playfair Display', ui-serif, Georgia, serif;
  --font-sans:    'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Radii */
  --radius-sm:   0.5rem;
  --radius-md:   0.75rem;
  --radius-lg:   1.25rem;
  --radius-xl:   1.75rem;

  /* Shadows */
  --shadow-soft: 0 4px 20px rgba(31, 20, 40, 0.06);
  --shadow-lift: 0 12px 32px rgba(31, 20, 40, 0.10);

  /* Motion */
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
}

/* ─── Base ─── */
body {
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: var(--color-surface-canvas);
}

html {
  scroll-behavior: smooth;
}

/* ─── App-level transitions (kept from original) ─── */
.galleria-transition-enter-active,
.galleria-transition-leave-active {
  transition: all 0.3s ease;
}

.galleria-transition-enter-from,
.galleria-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.review-card {
  transition: transform 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
}

/* ─── Scroll-reveal (was buggy — fix typo from v-intresect) ─── */
[v-intersect] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
}

[v-intersect].\!opacity-100 {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Notes:**
- Tailwind 4 derives `bg-primary-500`, `text-primary-700`, `font-display`, `shadow-soft`, `rounded-lg`, etc. directly from the `@theme` variable names.
- Legacy color aliases (`logo-pink`, `lavender-mist`, etc.) keep all existing class names working during migration; we'll prune them in Phase 2.
- `--color-pastel-peach` finally exists, so the broken `text-pastel-peach` headings render correctly.

---

## Task 8: Update `app.vue` (was `src/App.vue`)

**Files:**
- Modify: `app.vue`

- [ ] **Step 8.1: Replace contents**

```vue
<script setup>
// Components are auto-imported by Nuxt — no manual imports needed.
</script>

<template>
  <Header />
  <MainSection />
  <ForWhom />
  <Courses />
  <StudentsSection />
  <BeforeAfter />
  <Review />
  <FooterSection />
  <BookingDialog />
</template>
```

**Notes:**
- All component imports removed (Nuxt auto-import).
- `<BookingDialog />` mounted once at the root; opened from anywhere via `useBookingDialog()` composable (Task 9).

---

## Task 9: Create shared `BookingDialog` + composable

**Files:**
- Create: `composables/useBookingDialog.ts`
- Create: `components/BookingDialog.vue`

- [ ] **Step 9.1: Create `composables/useBookingDialog.ts`**

```ts
import { ref } from 'vue'

const visible = ref(false)

export const useBookingDialog = () => {
  return {
    visible,
    open: () => { visible.value = true },
    close: () => { visible.value = false },
  }
}
```

Module-level `ref` = singleton state shared across all callers. Standard Vue composable pattern.

- [ ] **Step 9.2: Create `components/BookingDialog.vue`**

```vue
<script setup>
import Dialog from 'primevue/dialog'

const { visible } = useBookingDialog()
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Бронювання курсу" :style="{ width: '400px' }">
    <div class="space-y-4 text-center mb-4">
      <p class="text-lg">Ви можете зв'язатись зі мною за допомогою:</p>
      <div class="flex justify-center space-x-6">
        <a
          href="https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          class="text-gray-600 hover:text-gray-900"
        >
          <font-awesome-icon class="h-8 hover:text-primary-500 transition-colors duration-200" :icon="['fab', 'instagram']" />
        </a>
        <a
          href="https://t.me/+380983693213"
          target="_blank"
          rel="noopener"
          aria-label="Telegram"
          class="text-gray-600 hover:text-gray-900"
        >
          <font-awesome-icon class="h-8 hover:text-blue-500 transition-colors duration-200" :icon="['fab', 'telegram']" />
        </a>
        <a
          href="viber://chat?number=+380983693213"
          aria-label="Viber"
          class="text-gray-600 hover:text-gray-900"
        >
          <font-awesome-icon class="h-8 hover:text-purple-500 transition-colors duration-200" :icon="['fab', 'viber']" />
        </a>
      </div>
      <p class="text-lg mt-4">Або за номер телефону:</p>
      <a href="tel:+380983693213" class="text-primary-500 text-xl font-semibold">+380983693213</a>
    </div>
  </Dialog>
</template>
```

---

## Task 10: Replace inline dialogs in Header.vue

**Files:**
- Modify: `components/Header.vue`

- [ ] **Step 10.1: Update `components/Header.vue`**

Replace the file with:

```vue
<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'

const visible = ref(false)
const { open: openBooking } = useBookingDialog()
</script>

<template>
  <header class="bg-white/85 backdrop-blur-md shadow-sm fixed w-full z-50 border-b border-soft-peach flex items-center justify-between px-4 md:px-10 py-2">
    <img src="~/assets/images/logo.png" alt="Masterface" class="w-44 md:w-52">
    <div class="flex items-center gap-3">
      <Button label="Забронювати" @click="openBooking" />
      <Drawer v-model:visible="visible" position="right">
        <ul class="text-center font-bold text-lg">
          <li class="mb-4"><a href="#for-whom" @click="visible = false" class="hover:text-primary-500">Для кого</a></li>
          <li class="mb-4"><a href="#course" @click="visible = false" class="hover:text-primary-500">Про курс</a></li>
          <li class="mb-4"><a href="#students" @click="visible = false" class="hover:text-primary-500">Учні</a></li>
          <li class="mb-4"><a href="#comparison" @click="visible = false" class="hover:text-primary-500">Результати</a></li>
          <li class="mb-4"><a href="#reviews" @click="visible = false" class="hover:text-primary-500">Відгуки</a></li>
        </ul>
        <template #footer>
          <div class="flex items-center justify-center">
            <a
              href="https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk"
              aria-label="Instagram"
              class="text-gray-600 hover:text-gray-900"
            >
              <font-awesome-icon class="h-8 hover:text-primary-500 transition-colors duration-200" :icon="['fab', 'instagram']" />
            </a>
          </div>
        </template>
      </Drawer>
      <Button variant="outlined" aria-label="Меню" @click="visible = true" class="custom-hover-button">
        <i class="pi pi-bars" style="color:var(--color-primary-500); font-size: 1.5rem"></i>
      </Button>
    </div>
  </header>
</template>

<style scoped>
.custom-hover-button {
  border-color: white !important;
}
.custom-hover-button:hover {
  background-color: transparent !important;
  border-color: var(--color-primary-500) !important;
}
</style>
```

**Changes:**
- Removed the inline `<Dialog>` and its `visibleDialog` ref → now uses `useBookingDialog()` composable.
- Removed `!bg-logo-pink !border-logo-pink` hard-overrides on Button (PrimeVue preset now provides brand pink primary).
- Fixed mobile overflow: `px-16` → `px-4 md:px-10`, `flex-col md:flex-row` → flat `flex` (logo + actions).
- `bg-white` → `bg-white/85 backdrop-blur-md` for sticky-glass header (subtle 2026 polish).
- Added `aria-label` on icon-only burger Button.

---

## Task 11: Replace inline dialog in MainSection.vue

**Files:**
- Modify: `components/MainSection.vue`

- [ ] **Step 11.1: Update `components/MainSection.vue`**

```vue
<script setup>
import { onMounted } from 'vue'
import anime from 'animejs/lib/anime.es.js'
import Button from 'primevue/button'
import backgroundImage from '~/assets/images/facemassagemain.jpg'

const { open: openBooking } = useBookingDialog()

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  anime({
    targets: 'h1',
    translateY: [-40, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuad',
  })
  anime({
    targets: 'iframe',
    translateY: [40, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: 500,
  })
})
</script>

<template>
  <div class="relative bg-cover bg-center h-screen" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="absolute inset-0 bg-black opacity-30"></div>
    <div class="flex flex-col pt-20 justify-center items-center h-full text-center px-6">
      <h1 class="text-4xl w-full md:w-2/3 md:text-5xl font-bold text-white leading-tight">
        ОПАНУЙ 6 НАЙПОТУЖНІШИХ ЛІФТИНГ - ТЕХНІК ТА СТАНЬ ЕКСПЕРТОМ ПРИРОДНОГО ОМОЛОДЖЕННЯ обличчя!
      </h1>
      <Button label="Бронюй зараз зі знижкою 40%" @click="openBooking" class="mt-8" />
      <div class="text-deep-lavender">*стандартна ціна без врахування знижки 500$</div>
    </div>
  </div>
</template>
```

**Changes:**
- Removed inline `<Dialog>` + `visible` ref.
- Removed `!bg-logo-pink !border-logo-pink` from Button.
- Wrapped animejs init in `prefers-reduced-motion` check.

---

## Task 12: Replace inline dialog in Courses.vue + fix v-intersect typo

**Files:**
- Modify: `components/Courses.vue`

- [ ] **Step 12.1: Open `components/Courses.vue` and apply these specific edits:**

**Edit A — script imports + booking ref:** Replace the `<script setup>` block's top:
```js
import {onMounted, ref} from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const visible = ref(false);
```
with:
```js
import { onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import Button from 'primevue/button'

const { open: openBooking } = useBookingDialog()
```

**Edit B — booking button:** Replace
```html
<Button label="Забронювати місце" @click="visible = true" class="!bg-logo-pink !border-logo-pink mt-8 mx-auto" />
```
with:
```html
<Button label="Забронювати місце" @click="openBooking" class="mt-8 mx-auto" />
```

**Edit C — remove inline `<Dialog>`:** Delete the entire `<Dialog v-model:visible="visible" modal header="Бронювання курсу" ...>...</Dialog>` block.

**Edit D — fix typo in `<style>`:** Replace
```css
[v-intresect].!opacity-100 {
```
with
```css
[v-intersect].\!opacity-100 {
```

(The selector now matches; was silently dead before.)

**Edit E — replace 🎁 emoji + remove `!bg-logo-pink`:** Replace
```html
<h3 class="text-2xl font-bold text-dark-gray">Бонус 🎁</h3>
```
with
```html
<h3 class="text-2xl font-bold text-dark-gray flex items-center gap-2">
  Бонус
  <Gift class="w-5 h-5 text-primary-500" />
</h3>
```

And add at the top of `<script setup>`:
```js
import { Gift } from 'lucide-vue-next'
```

---

## Task 13: Bug-fix the broken `text-pastel-peach` headings

**Files:**
- Modify: `components/StudentsSection.vue`
- Modify: `components/BeforeAfter.vue`
- Modify: `components/Review.vue`

`text-pastel-peach` was an undefined Tailwind class — headings rendered as default black. The token now exists (added in Task 7), so these will pick up `#FFD4B8`. But peach-on-white is poor contrast for headings — switch them to brand text.

- [ ] **Step 13.1: In all three files, replace**

```html
<h2 class="text-3xl font-bold text-center mb-12 text-pastel-peach">Студенти</h2>
```

(and "До / Після", "Відгуки" variants) with:

```html
<h2 class="text-3xl md:text-4xl font-display font-semibold text-center mb-12 text-text-primary">Студенти</h2>
```

(adjust the heading text per file: "Студенти", "До / Після", "Відгуки").

- [ ] **Step 13.2: Same files — fix indicator color**

Replace the indicator template:
```html
<button class="w-3 h-3 rounded-full transition-colors mx-1"
        :class="slotProps.highlighted ? 'bg-pastel-peach' : 'bg-gray-300'" />
```
with:
```html
<button class="w-3 h-3 rounded-full transition-colors mx-1"
        :class="slotProps.highlighted ? 'bg-primary-500' : 'bg-gray-300'" />
```

---

## Task 14: Image hardening (lazy-load + dimensions)

**Files:**
- Modify: `components/StudentsSection.vue`
- Modify: `components/BeforeAfter.vue`
- Modify: `components/Review.vue`
- Modify: `components/ForWhom.vue` (iframe `title`)
- Modify: `components/Courses.vue` (iframe `title` + `loading="lazy"` already set)

- [ ] **Step 14.1: In `StudentsSection.vue`, update `<img>` template**

Replace:
```html
<img
    :src="slotProps.data.image"
    alt="Before treatment"
    class="w-full h-full object-cover"
>
```
with:
```html
<img
    :src="slotProps.data.image"
    alt="Робота студентки курсу"
    width="800"
    height="800"
    loading="lazy"
    decoding="async"
    class="w-full h-full object-cover"
>
```

- [ ] **Step 14.2: In `BeforeAfter.vue`, update `<img>`**

```html
<img
    :src="slotProps.data.image"
    alt="Результат до і після курсу масажу"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
    class="w-full h-full object-cover"
>
```

- [ ] **Step 14.3: In `Review.vue`, update `<img>`**

```html
<img
    :src="slotProps.data.image"
    alt="Відгук учениці"
    width="600"
    height="800"
    loading="lazy"
    decoding="async"
    class="w-full h-full"
>
```

- [ ] **Step 14.4: In `ForWhom.vue`, add iframe title**

```html
<iframe
    class="w-full md:w-1/2 max-w-1/2 aspect-video mx-auto rounded-lg shadow-lg"
    src="https://www.youtube.com/embed/Bd0tmu9BLbc?start=35"
    title="Презентація курсу Masterface"
    frameborder="0"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>
```

- [ ] **Step 14.5: In `Courses.vue`, add `title` to each of the 6 step-4 iframes**

Add `title="Урок масажу — техніка X"` (where X = 1..6) to each `<iframe>` in the videos grid. Also confirm each already has `loading="lazy"`.

---

## Task 15: Update FooterSection.vue (color cleanup)

**Files:**
- Modify: `components/FooterSection.vue`

- [ ] **Step 15.1: Replace contents**

```vue
<template>
  <footer class="footer bg-primary-100 py-6 text-text-primary text-center">
    <div class="flex items-center justify-center mb-4">
      <a
        href="https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk"
        aria-label="Instagram"
        class="text-gray-600 hover:text-gray-900"
      >
        <font-awesome-icon class="h-8 hover:text-primary-700 transition-colors duration-200" :icon="['fab', 'instagram']" />
      </a>
    </div>
  </footer>
</template>

<script setup>
</script>
```

(Phase 2 will replace this with a proper 3-column footer.)

---

## Task 16: Update `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 16.1: Append Nuxt entries**

```bash
cat >> .gitignore <<'EOF'

# Nuxt
.nuxt
.output
.data
.nitro
.cache
.env
EOF
```

Then verify no duplicates:
```bash
sort -u .gitignore -o .gitignore
```

(or just inspect manually if `sort` reorders things you'd rather keep.)

---

## Task 17: Verify dev server runs clean

- [ ] **Step 17.1: Start dev server in background**

```bash
npm run dev
```

Run in background. Wait for `Local: http://localhost:3000` line.

- [ ] **Step 17.2: Manually open the page**

Open `http://localhost:3000` in a browser. Expected:
- Page renders identically to pre-migration state (modulo the heading-color fix in StudentsSection/BeforeAfter/Review which now show brand-colored headings instead of invisible peach).
- No console errors.
- Booking dialog opens from Header button, Hero CTA button, and Courses CTA button (all three open the same dialog instance).
- Burger menu opens drawer with anchor links.
- Anchor links scroll to sections.
- Hero animation plays once on load (or skipped if reduced-motion enabled in OS).

- [ ] **Step 17.3: Stop dev server**

---

## Task 18: Verify production build (SSG output for Vercel)

- [ ] **Step 18.1: Build**

```bash
npm run build
```

Expected: completes without errors. Output in `.output/public/`.

- [ ] **Step 18.2: Inspect output**

```bash
ls -la .output/public/
```

Expected: `index.html` exists with rendered HTML (not an empty `<div id="app">`), assets in `_nuxt/`.

- [ ] **Step 18.3: Preview build locally**

```bash
npm run preview
```

Visit `http://localhost:3000`. Expected: same as dev. Stop preview when done.

---

## Task 19: Commit

- [ ] **Step 19.1: Stage and commit**

```bash
git add -A
git status      # verify what's being committed
git commit -m "$(cat <<'EOF'
migrate to nuxt 4 and lay phase-1 redesign foundations

- migrate vue 3 + vite spa to nuxt 4 (ssg via nitro static preset)
- swap tailwind 3 → 4 with css-first @theme tokens
- add @nuxt/fonts for playfair display + inter
- add lucide-vue-next, motion-v (foundation for phase 2)
- add @primevue/nuxt-module with brand-pink aura preset
- extract shared booking dialog (was inline in 3 components)
- fix bugs: undefined text-pastel-peach class, v-intresect typo,
  header px-16 mobile overflow
- harden images: lazy-load, decoding=async, width/height
- add iframe titles for a11y
- wrap hero anime.js init in prefers-reduced-motion guard

no visual redesign yet — this is the foundation for the editorial
soft-luxury redesign in subsequent phases.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 19.2: Verify commit**

```bash
git log --oneline -1
git status
```

Expected: clean working tree, commit at HEAD.

---

## Self-Review (engineer should re-verify before each task)

**Spec coverage check (against the redesign spec § "Cross-cutting upgrades" and § "Phase 1"):**
- Tailwind tokens → Task 7 ✅
- Fonts → Tasks 2 + 3 (`@nuxt/fonts`) + 7 (`--font-display` / `--font-sans`) ✅
- PrimeVue theme override → Tasks 5 + 11 + 12 (drop `!bg-logo-pink !border-logo-pink`) ✅
- Lucide icons → Task 12 (Bonus card emoji replaced) — broader pi-icon swap deferred to Phase 2 ✅
- pastel-peach + v-intresect bug fix → Tasks 12 + 13 ✅
- Image lazy-load + dimensions → Task 14 ✅
- Shared BookingDialog → Tasks 9–12 ✅
- Nuxt 4 migration (added scope this turn) → Tasks 2–8, 17, 18 ✅

**Out of scope (Phase 2+):** Hero rebuild, Bento grid for ForWhom, Courses two-column timeline, true Before/After slider, Students masonry grid, Reviews wall, Pricing strip, full footer, motion-v actually being used to replace animejs, dropping FontAwesome for Lucide everywhere, removing legacy color aliases.

**Risk notes:**
- `lucide-vue-next` reaching `1.0.0` is a coincidence of latest npm release; verify on install.
- If `@primevue/nuxt-module` `importTheme` doesn't work as documented, fall back to `defineNuxtPlugin` that calls `app.use(PrimeVue, { theme: { preset: masterfacePreset } })` directly and remove the `primevue:` block from `nuxt.config.ts`.
- If `nitro: { preset: 'static' }` causes issues locally with `nuxt dev`, it only affects `nuxt build`/`generate`. Dev should still work.
- Vercel auto-detects Nuxt 4 and runs `nuxt build` → static output goes to Vercel's CDN. No `vercel.json` needed.
