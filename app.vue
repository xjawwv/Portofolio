<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ArrowRight, ArrowUpRight, CodeXml, Globe, Mail, MapPin, Phone, Share2 } from '@lucide/vue'
import portfolio from './data/portfolio.json'

let revealObserver: IntersectionObserver | undefined

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

  const revealItems = document.querySelectorAll<HTMLElement>('.reveal:not(.intro-reveal), .text-reveal:not(.intro-reveal)')
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })

  revealItems.forEach((item) => revealObserver?.observe(item))
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.documentElement.classList.add('page-ready'))
  })
  window.addEventListener('keydown', handleEducationKeydown)
})

onBeforeUnmount(() => {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => link.removeEventListener('click', scrollToAnchor))
  revealObserver?.disconnect()
  revealObserver = undefined
  window.removeEventListener('keydown', handleEducationKeydown)
})

const { hero, stats, projects, tools, processSteps, contact } = portfolio
const education = portfolio.education
const introWords = hero.description.split(' ')
const contactWords = contact.description.split(' ')
const selectedEducation = ref<{ title: string; meta: string; image: string } | null>(null)
const certificateZoom = ref(1)

const closeEducationPreview = () => {
  selectedEducation.value = null
  certificateZoom.value = 1
}

const openEducationPreview = (item: typeof education[number]) => {
  selectedEducation.value = item
  certificateZoom.value = 1
}

const changeCertificateZoom = (amount: number) => {
  certificateZoom.value = Math.min(3, Math.max(1, certificateZoom.value + amount))
}

const handleEducationKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeEducationPreview()
}
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
            <a class="btn btn-light nav-button" href="#contact">LET'S TALK <ArrowUpRight :size="14" :stroke-width="1.8" /></a>
          </div>
        </div>
      </div>
    </nav>

    <main id="top">
      <section id="about" class="hero container-xl px-4 px-lg-0">
        <div class="hero-copy">
          <h1 class="intro-reveal text-reveal"><span class="text-word">{{ hero.title[0] }}</span><br /><i><span class="text-word">{{ hero.title[1] }}</span></i></h1>
          <p class="hero-intro intro-reveal text-reveal"><span v-for="word in introWords" :key="word" class="text-word">{{ word }}</span></p>
          <div class="d-flex flex-wrap align-items-center gap-4 mt-4 intro-reveal">
            <a class="btn btn-light btn-arrow" href="#work">VIEW MY WORK <ArrowUpRight :size="14" :stroke-width="1.8" /></a>
          </div>
        </div>
        <div class="hero-art">
          <div class="portrait intro-image"></div>
          <div class="orb orb-one"></div><div class="orb orb-two"></div>
        </div>
      </section>

      <section class="container-xl px-4 px-lg-0 stats-wrap">
        <div class="stats row g-0">
          <div v-for="stat in stats" :key="stat.label" class="stat col-6 col-lg-3"><strong>{{ stat.value }}<span>{{ stat.suffix }}</span></strong><small>{{ stat.label }}</small></div>
        </div>
      </section>

      <section id="work" class="section container-xl px-4 px-lg-0">
        <div class="section-heading"><div><h2 class="reveal text-reveal"><span class="text-word">A</span> <span class="text-word">cool</span> <span class="text-word">job</span><br /><em><span class="text-word">an</span> <span class="text-word">impact.</span></em></h2></div><a class="text-link d-none d-md-block reveal text-reveal" href="#contact"><span class="text-word">EXPLORE</span> <span class="text-word">ALL</span> <span class="text-word">PROJECTS</span> <ArrowRight :size="14" :stroke-width="1.8" /></a></div>
        <div class="row g-4 project-grid">
          <article v-for="(project, index) in projects" :key="project.title[0]" class="col-md-6" :class="{ 'featured-project': index === 0 }">
            <a class="project-card" :class="[project.accent, 'reveal']" :style="{ backgroundImage: `url(${project.image})` }" href="#contact">
               <div class="project-overlay"></div><div class="project-meta"><p>{{ project.type }}<br />{{ project.category }}</p><span class="circle-arrow"><ArrowUpRight :size="20" :stroke-width="1.5" /></span></div>
              <h3>{{ project.title[0] }}<br /><em>{{ project.title[1] }}</em></h3>
            </a>
          </article>
        </div>
      </section>

      <section id="tools" class="section container-xl px-4 px-lg-0 tools-section"><div class="row g-5"><div class="col-lg-5"><h2 class="reveal text-reveal"><span class="text-word">Tools</span> <span class="text-word">of</span><br /><em><span class="text-word">the</span> <span class="text-word">trade.</span></em></h2></div><div class="col-lg-7"><div class="tool-cloud reveal"><span v-for="tool in tools" :key="tool[0]" class="tool-chip"><i :class="tool[1]" aria-hidden="true"></i>{{ tool[0] }}</span></div><div class="education"><p class="section-label">EDUCATION & CERTIFICATION</p><div v-for="item in education" :key="item.title" class="edu-line reveal text-reveal"><strong>{{ item.title }}</strong><span>{{ item.meta }}</span><button class="certificate-button" type="button" @click="openEducationPreview(item)">VIEW CERTIFICATE <ArrowUpRight :size="13" /></button></div></div></div></div></section>

      <section class="section container-xl px-4 px-lg-0 process-section"><div class="process-row"><div v-for="step in processSteps" :key="step[0]" class="process-step reveal"><span>{{ step[0] }}</span><h4>{{ step[1] }}</h4><p>{{ step[2] }}</p></div></div></section>

      <section id="contact" class="contact-section container-xl px-4 px-lg-0"><div><h2 class="reveal text-reveal"><span class="text-word">LET'S</span> <span class="text-word">MAKE</span><br /><em><span class="text-word">something</span></em><br /><span class="text-word">remarkable.</span></h2></div><div class="contact-side reveal"><p class="text-reveal"><span v-for="word in contactWords" :key="word" class="text-word">{{ word }}</span></p><a class="btn btn-light btn-arrow" :href="`mailto:${contact.email}`">LET'S WORK TOGETHER <ArrowUpRight :size="14" :stroke-width="1.8" /></a><div class="contact-details"><a :href="`mailto:${contact.email}`"><Mail :size="14" /> {{ contact.email }}</a><a :href="`tel:${contact.phone.replace(/\s/g, '')}`"><Phone :size="14" /> {{ contact.phone }}</a><span><MapPin :size="14" /> {{ contact.location }}</span><a :href="contact.github" target="_blank" rel="noreferrer"><CodeXml :size="14" /> GitHub</a><a href="#top"><Globe :size="14" /> {{ contact.website }}</a></div></div></section>
    </main>

    <footer class="container-xl px-4 px-lg-0 footer"><span>© 2026 AV STUDIO. ALL RIGHTS RESERVED.</span><span>LET'S CONNECT &nbsp; <a href="#" aria-label="Social profile"><Share2 :size="14" /></a> &nbsp; <a href="#" aria-label="Website"><Globe :size="14" /></a></span></footer>

    <div v-if="selectedEducation" class="certificate-modal" role="dialog" aria-modal="true" :aria-label="selectedEducation.title" @click.self="closeEducationPreview">
      <div class="certificate-dialog">
        <button class="certificate-close" type="button" aria-label="Close certificate preview" @click="closeEducationPreview">×</button>
        <div class="certificate-toolbar"><p class="section-label">{{ selectedEducation.title }}</p><div v-if="selectedEducation.type !== 'pdf'"><button type="button" aria-label="Zoom out" @click="changeCertificateZoom(-0.25)">−</button><span>{{ Math.round(certificateZoom * 100) }}%</span><button type="button" aria-label="Zoom in" @click="changeCertificateZoom(0.25)">+</button><button type="button" aria-label="Reset zoom" @click="certificateZoom = 1">RESET</button></div></div>
        <div v-if="selectedEducation.type === 'pdf'" class="certificate-pdf-wrap"><iframe :src="`${selectedEducation.image}#view=FitH`" :title="`${selectedEducation.title} PDF`"></iframe></div>
        <div v-else class="certificate-image-wrap"><img :src="selectedEducation.image" :alt="`${selectedEducation.title} certificate`" :style="{ transform: `scale(${certificateZoom})` }" @click="certificateZoom = certificateZoom === 1 ? 2 : 1" /></div>
        <small>{{ selectedEducation.meta }}</small>
      </div>
    </div>
  </div>
</template>
