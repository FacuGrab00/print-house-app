import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@nuxt/eslint',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    // TODO: reemplazar por el dominio real
    url: 'https://example.com',
    name: 'PrintHouse',
    description: 'Papelería creativa, grabados láser, sublimación y diseño gráfico. Todo lo que imaginás, hecho a tu medida.',
    defaultLocale: 'es',
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: 'Poppins', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Archivo Black', provider: 'google', weights: [400] },
    ],
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons'],
    },
  },
})
