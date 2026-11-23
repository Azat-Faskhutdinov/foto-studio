import tailwindcss from '@tailwindcss/vite'

// Documentation : https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',

  modules: [
    '@nuxt/fonts', // auto-hébergement des polices (Roboto + Baron Neue)
    '@nuxtjs/color-mode', // thème clair / sombre
  ],

  // Tailwind CSS v4 : branché directement sur Vite, la configuration vit dans le CSS
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'keywords', content: 'photographe, mariage, portrait, couple, corporate, paris, ile de france, france, photo studio' },
        { name: 'msapplication-TileColor', content: '#2a2a2a' },
        { name: 'theme-color', content: '#FFFFFF', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#2A2A2A', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'manifest', href: (process.env.NUXT_APP_BASE_URL || '/') + 'manifest.webmanifest' },
        { rel: 'apple-touch-icon', href: (process.env.NUXT_APP_BASE_URL || '/') + 'apple-touch-icon-180x180.png' },
        { rel: 'mask-icon', href: (process.env.NUXT_APP_BASE_URL || '/') + 'safari-pinned-tab.svg', color: '#fca87f' },
      ],
    },
  },

  nitro: { prerender: { routes: ['/', '/about', '/gallery'] } },

  fonts: {
    families: [
      // Téléchargée depuis Google Fonts au build puis servie par le site (police variable 100 → 700)
      {
        name: 'Roboto',
        provider: 'google',
        weights: ['100 700'],
        styles: ['normal', 'italic'],
        subsets: ['latin', 'cyrillic'],
      },
    ],
    // Aucun autre fournisseur n'est interrogé
    providers: {
      bunny: false,
      fontshare: false,
      fontsource: false,
      adobe: false,
      npm: false,
    },
  },

  colorMode: {
    classSuffix: '', // classe « dark » sur <html>, utilisée par Tailwind
  },
})
