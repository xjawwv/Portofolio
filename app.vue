<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let removeRevealListener: (() => void) | undefined

const scrollToAnchor = (event: Event) => {
  const link = event.currentTarget as HTMLAnchorElement
  const hash = link.hash
  if (!hash || hash === '#') return

  const target = document.querySelector(hash)
  if (!target) return

  event.preventDefault()
  const start = window.scrollY
  const offset = 92
  const end = Math.max(0, target.getBoundingClientRect().top + start - offset)
  const distance = end - start
  const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.45))
  const startedAt = performance.now()
  const ease = (progress: number) => progress < 0.5
    ? 4 * progress ** 3
    : 1 - ((-2 * progress + 2) ** 3) / 2

  const animate = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    window.scrollTo(0, start + distance * ease(progress))
    if (progress < 1) requestAnimationFrame(animate)
    else history.pushState(null, '', hash)
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => link.addEventListener('click', scrollToAnchor))

  const revealItems = document.querySelectorAll<HTMLElement>('.reveal')
  const revealOnScroll = () => {
    const triggerLine = window.innerHeight * 0.82
    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < triggerLine) item.classList.add('is-visible')
    })
  }

  revealOnScroll()
  window.addEventListener('scroll', revealOnScroll, { passive: true })
  removeRevealListener = () => window.removeEventListener('scroll', revealOnScroll)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.documentElement.classList.add('page-ready'))
  })

})

onBeforeUnmount(() => {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => link.removeEventListener('click', scrollToAnchor))
  removeRevealListener?.()
})

const projects = [
  { title: ['Finance', 'Dashboard'], type: 'UI/UX DESIGN', category: 'WEB APPLICATION', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=85', accent: 'project-orange' },
  { title: ['Elevate', 'Your Brand'], type: 'WEBSITE DESIGN', category: 'BRANDING', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1100&q=85', accent: 'project-blue' },
  { title: ['Wellness', 'Companion'], type: 'MOBILE APP DESIGN', category: 'HEALTH & LIFESTYLE', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1100&q=85', accent: 'project-violet' },
]

const tools = [
  ['Figma', 'devicon-figma-plain'], ['Photoshop', 'devicon-photoshop-plain'], ['Illustrator', 'devicon-illustrator-plain'],
  ['Webflow', 'devicon-webflow-original'], ['Framer', 'devicon-framermotion-plain'], ['Spline', 'devicon-threejs-original'],
  ['After Effects', 'devicon-aftereffects-plain'], ['Notion', 'devicon-notion-plain'], ['HTML/CSS', 'devicon-html5-plain'],
]
const process = [
  ['01', 'DISCOVER', 'Understanding goals, users, and the problem in depth.'],
  ['02', 'DEFINE', 'Research, analyze, and turn insights into clear direction.'],
  ['03', 'DESIGN', 'Designing intuitive interfaces with clarity and purpose.'],
  ['04', 'DEVELOP', 'Collaborating with developers to bring ideas to life.'],
  ['05', 'DELIVER', 'Testing, refining, and launching seamless experiences.'],
]
const introWords = 'Saya merancang pengalaman digital yang elegan dan berperforma tinggi dengan menggabungkan strategi, estetika, dan teknologi.'.split(' ')
const contactWords = 'I’m currently available for freelance projects and collaborations. Let’s make something meaningful together.'.split(' ')
</script>

<template>
  <div class="site-shell">
    <nav class="navbar navbar-expand-lg site-nav">
      <div class="container-xl px-4 px-lg-0">
        <a class="brand" href="#top">AV<span>.</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Buka navigasi">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="mainNav" class="collapse navbar-collapse justify-content-end">
          <div class="nav-links align-items-lg-center">
            <a href="#work">WORK</a><a href="#tools">TOOLS</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a>
            <a class="btn btn-light nav-button" href="#contact">LET'S TALK <span>↗</span></a>
          </div>
        </div>
      </div>
    </nav>

    <main id="top">
      <section id="about" class="hero container-xl px-4 px-lg-0">
        <div class="hero-copy">
          <h1 class="intro-reveal text-reveal"><span class="text-word">DIGITAL</span><br /><i><span class="text-word">DESIGNER</span></i></h1>
          <p class="hero-intro intro-reveal text-reveal"><span v-for="word in introWords" :key="word" class="text-word">{{ word }}</span></p>
          <div class="d-flex flex-wrap align-items-center gap-4 mt-4 intro-reveal">
            <a class="btn btn-light btn-arrow" href="#work">VIEW MY WORK <span>↗</span></a>
          </div>
        </div>
        <div class="hero-art">
          <div class="portrait intro-image"></div>
          <div class="orb orb-one"></div><div class="orb orb-two"></div>
          <span class="vertical-note">SELECTED WORKS / 2020—2026</span>
        </div>
      </section>

      <section class="container-xl px-4 px-lg-0 stats-wrap">
        <div class="stats row g-0">
          <div class="stat col-6 col-lg-3"><strong>6<span>+</span></strong><small>YEARS EXPERIENCE</small></div>
          <div class="stat col-6 col-lg-3"><strong>40<span>+</span></strong><small>PROJECTS COMPLETED</small></div>
          <div class="stat col-6 col-lg-3"><strong>18<span>+</span></strong><small>HAPPY CLIENTS</small></div>
          <div class="stat col-6 col-lg-3"><strong>12</strong><small>COUNTRIES WORKED WITH</small></div>
        </div>
      </section>

      <section id="work" class="section container-xl px-4 px-lg-0">
        <div class="section-heading"><div><h2 class="reveal text-reveal"><span class="text-word">Work</span> <span class="text-word">that</span> <span class="text-word">makes</span><br /><em><span class="text-word">an</span> <span class="text-word">impact.</span></em></h2></div><a class="text-link d-none d-md-block reveal text-reveal" href="#contact"><span class="text-word">EXPLORE</span> <span class="text-word">ALL</span> <span class="text-word">PROJECTS</span> <span>→</span></a></div>
        <div class="row g-4 project-grid">
          <article v-for="(project, index) in projects" :key="project.title[0]" class="col-md-6" :class="{ 'featured-project': index === 0 }">
            <a class="project-card" :class="[project.accent, 'reveal']" :style="{ backgroundImage: `url(${project.image})` }" href="#contact">
              <div class="project-overlay"></div><div class="project-meta"><p>{{ project.type }}<br />{{ project.category }}</p><span class="circle-arrow">↗</span></div>
              <h3>{{ project.title[0] }}<br /><em>{{ project.title[1] }}</em></h3>
            </a>
          </article>
        </div>
      </section>

      <section id="tools" class="section container-xl px-4 px-lg-0 tools-section"><div class="row g-5"><div class="col-lg-5"><h2 class="reveal text-reveal"><span class="text-word">Tools</span> <span class="text-word">of</span><br /><em><span class="text-word">the</span> <span class="text-word">trade.</span></em></h2></div><div class="col-lg-7"><div class="tool-cloud reveal"><span v-for="tool in tools" :key="tool[0]" class="tool-chip"><i :class="tool[1]" aria-hidden="true"></i>{{ tool[0] }}</span></div><div class="education"><p class="section-label">EDUCATION & CERTIFICATION</p><div class="edu-line reveal text-reveal"><strong><span class="text-word">Google</span> <span class="text-word">UX</span> <span class="text-word">Design</span></strong><span><span class="text-word">Professional</span> <span class="text-word">Certificate</span> / 2024</span></div><div class="edu-line reveal text-reveal"><strong><span class="text-word">Bachelor</span> <span class="text-word">of</span> <span class="text-word">Design</span></strong><span><span class="text-word">Institut</span> <span class="text-word">Teknologi</span> <span class="text-word">Bandung</span> / 2018</span></div></div></div></div></section>

      <section class="section container-xl px-4 px-lg-0 process-section"><div class="process-row"><div v-for="step in process" :key="step[0]" class="process-step reveal"><span>{{ step[0] }}</span><h4>{{ step[1] }}</h4><p>{{ step[2] }}</p></div></div></section>

      <section id="contact" class="contact-section container-xl px-4 px-lg-0"><div><h2 class="reveal text-reveal"><span class="text-word">LET'S</span> <span class="text-word">MAKE</span><br /><em><span class="text-word">something</span></em><br /><span class="text-word">remarkable.</span></h2></div><div class="contact-side reveal"><p class="text-reveal"><span v-for="word in contactWords" :key="word" class="text-word">{{ word }}</span></p><a class="btn btn-light btn-arrow" href="mailto:hello@example.com">LET'S WORK TOGETHER <span>↗</span></a><div class="contact-details"><a href="mailto:hello@example.com">✉ hello@example.com</a><a href="tel:+6281234567890">⌕ +62 812 3456 7890</a><span>⌖ Bandung, Indonesia</span><a href="#top">◎ yourname.com</a></div></div></section>
    </main>

    <footer class="container-xl px-4 px-lg-0 footer"><span>© 2026 AV STUDIO. ALL RIGHTS RESERVED.</span><span>LET'S CONNECT &nbsp; <a href="#">in</a> &nbsp; <a href="#">Be</a> &nbsp; <a href="#">◎</a></span></footer>
  </div>
</template>
