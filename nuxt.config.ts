import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  typescript: {
    typeCheck: true,
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxt/eslint', 'shadcn-nuxt', '@vueuse/nuxt', '@nuxtjs/storybook'],
  vite: {
    plugins: [tailwindcss()],
  },
});
