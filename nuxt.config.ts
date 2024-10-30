export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3000', 
    },
  },

  compatibilityDate: '2024-10-31',
})