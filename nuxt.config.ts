import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],

  components: [
    { path: '~/components', pathPrefix: false, ignore: ['~/components/ui/**'] },
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
