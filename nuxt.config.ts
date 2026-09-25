export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['bootstrap/dist/css/bootstrap.min.css', 'devicon/devicon.min.css', '~/assets/css/main.css'],
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'DM+Sans': [400, 500, 600, 700],
      'Space+Grotesk': [400, 500, 600, 700],
    },
    display: 'swap',
  },
  app: {
    head: {
      title: 'AV — Digital Designer',
      meta: [{ name: 'description', content: 'Portfolio digital designer yang berfokus pada pengalaman digital berkelas.' }],
    },
  },
})
