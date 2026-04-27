// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Modules
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
  ],

  // Global CSS
  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  // Internationalization
  i18n: {
    locales: [
      { code: 'fr', file: 'fr.json', name: 'Français' },
      { code: 'en', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'fr',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // Sitemap
  site: {
    url: 'https://arthur-souchon.com',
    name: 'Arthur Souchon — Freelance IA & Automation',
  },

  // Server-side only config (never exposed to client)
  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
  },

  // Vercel deployment (preset auto-détecté sur Vercel, pas besoin en dev)
  nitro: { preset: 'vercel' },

  // App head
  app: {
    head: {
      title: 'Arthur Souchon — Freelance IA & Automation',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#020617' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
})
