
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({  
  extends: '@nuxt-themes/docus',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
})