<script setup lang="ts">
definePageMeta({
  title: 'Главная',
  description: 'Фотоателье — демонстрационный сайт с галереей.',
})

/** Phrase de la section « À propos » (les passages mis en valeur sont en italique) */
const ABOUT_PHRASE = [
  'Для меня ',
  { text: 'фотография', emphasis: true },
  ' — способ сохранить ',
  { text: 'воспоминания', emphasis: true },
  ' и ',
  { text: 'пережитые эмоции', emphasis: true },
]

// Les liens apparaissent 0,1 s après le début de la dernière lettre
const aboutPhraseText = ABOUT_PHRASE.map(part => (typeof part === 'string' ? part : part.text)).join('')
const aboutLetterCount = aboutPhraseText.replace(/\s/g, '').length
const aboutLinksDelay = `${(aboutLetterCount - 1) * 0.025 + 0.1}s`

/** Mosaïque de photos : placement dans la grille de 11 colonnes, et format */
const PORTFOLIO = [
  {
    file: '1',
    portrait: true,
    alt: 'Горное озеро на закате',
    layout: 'z-1 col-start-1 col-end-12 row-start-2 row-end-2 mt-[5vw] sm:col-end-6 sm:row-start-1 sm:row-end-1 sm:mt-0',
  },
  {
    file: '2',
    portrait: false,
    alt: 'Горная долина ночью',
    layout: 'col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:-mt-[1.5vw]',
  },
  {
    file: '3',
    portrait: false,
    alt: 'Кольца и букет',
    layout: 'col-start-1 col-end-12 mt-[5vw] sm:col-end-8',
  },
  {
    file: '4',
    portrait: true,
    alt: 'Белая лестница',
    layout: 'z-1 col-start-1 col-end-12 mt-[5vw] sm:col-start-7 sm:-mt-[2vw]',
  },
  {
    file: '5',
    portrait: true,
    alt: 'Лестница на солнце',
    layout: 'z-1 col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:-mt-[15vw]',
  },
  {
    file: '6',
    portrait: false,
    alt: 'Северное сияние над лесом',
    layout: 'col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:-mt-[15vw]',
  },
  {
    file: '7',
    portrait: false,
    alt: 'Лунный свет над озером',
    layout: 'col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[10vw]',
  },
  {
    file: '8',
    portrait: true,
    alt: 'Фасад с отражениями',
    layout: 'z-1 col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:-mt-[20vw]',
  },
  {
    file: '9',
    portrait: true,
    alt: 'Архитектура и свет',
    layout: 'z-1 col-start-1 col-end-12 mt-[5vw] sm:col-start-7 sm:mt-[10vw]',
  },
  {
    file: '10',
    portrait: false,
    alt: 'Интерьер с лестницами',
    layout: 'col-start-1 col-end-12 mt-[5vw] sm:col-end-8 sm:-mt-[10vw]',
  },
  {
    file: '11',
    portrait: false,
    alt: 'Траектории звёзд',
    layout: 'z-1 col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[7vw]',
  },
  {
    file: '12',
    portrait: true,
    alt: 'Млечный Путь над озером',
    layout: 'col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:-mt-[15vw]',
  },
]

const introStarted = usePageIntro()
const scroll = useSmoothScroll()

/** Boutons « Réserver » : défilement jusqu'au formulaire de contact */
const goToContactForm = () => scroll.scrollTo('#formsection', { duration: 3, easing: ease.power3.inOut })

// ---------------------------------------------------------------------------
// Parallaxe du haut de page : pendant que l'en-tête défile, le titre monte,
// la photo grossit et l'encart « Réservation » sort par la droite.
// ---------------------------------------------------------------------------
const hero = useTemplateRef('hero')
const title = useTemplateRef('title')
const subtitle = useTemplateRef('subtitle')
const heroImage = useTemplateRef('heroImage')
const callToAction = useTemplateRef('callToAction')

useScrollFrame(() => {
  if (!hero.value)
    return
  const progress = ease.power1.out(scrollProgress(hero.value))
  title.value!.style.translate = `0 ${-250 * progress}%`
  subtitle.value!.style.translate = `0 ${-350 * progress}%`
  heroImage.value!.style.scale = String(1 + 0.4 * progress)
  callToAction.value!.style.transform = `translateX(${100 * progress}%)`
})
</script>

<template>
  <div>
    <!-- ===================== EN-TÊTE ===================== -->
    <section ref="hero" class="h-[110vh] min-h-100 overflow-hidden" :class="{ 'is-revealed': introStarted }">
      <div class="o-container">
        <div class="relative h-[90vh] min-h-80 sm:h-screen">
          <div class="absolute top-0 grid h-3/5 w-full justify-center">
            <h1
              ref="title"
              class="z-1 cursor-text self-end text-center font-baron text-[8.7vw] leading-tight sm:text-[7vw] xl:text-[84px] [--duration:0.8s] [--stagger:70ms]"
            >
              <SplitText text="Фотоателье" />
            </h1>
            <p
              ref="subtitle"
              class="z-1 cursor-text self-start text-center text-[5.3vw] leading-none font-thin text-dark-lavender sm:text-[3.6vw] xl:text-[43.2px] dark:text-dark-orange [--delay:0.8s] [--duration:0.6s] [--stagger:70ms]"
            >
              <SplitText text="ФОТОГРАФ" />
            </p>
          </div>

          <div ref="heroImage" class="z-0 size-full px-[10vw] py-[10vh] sm:px-[20vw]">
            <div
              :style="{ backgroundImage: `url(${useRuntimeConfig().app.baseURL}demo/hero-light.webp)` }"
              class="reveal-scale relative m-auto  h-full max-h-213.25 w-[63vw] max-w-[63vw] rounded-[8rem] bg-cover bg-center bg-no-repeat sm:max-h-full sm:w-full sm:max-w-113.5 lt:rounded-[11rem] av:rounded-full [--delay:1.4s] [--duration:1.2s] [--from-scale:0.6]"
            >
              <!-- Version sombre en fondu par-dessus la version claire -->
              <div
                :style="{ backgroundImage: `url(${useRuntimeConfig().app.baseURL}demo/hero-dark.webp)` }"
              class="absolute inset-0 rounded-[inherit]  bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-500 dark:opacity-100"
              />
            </div>
          </div>

          <!-- Encart « Réservation » (écrans moyens et grands) -->
          <div
            ref="callToAction"
            class="reveal-fade-up absolute top-2/3 left-[70%] z-20 hidden w-1/5 max-w-48 gap-2 sm:grid md:left-3/4 lt:top-1/2 [--delay:1.9s] [--duration:1.2s] [--from-y:80px]"
          >
            <span class="hidden cursor-text font-bold lt:block">Форма связи</span>
            <span class="hidden cursor-text text-[0.9rem] lt:block">
              Посмотрите, как выглядит форма связи.
            </span>
            <span class="my-2 hidden w-2/5 border-t-4 lt:block" />
            <button type="button" aria-label="Открыть форму связи" class="group mt-[0.3rem] h-12 w-48" @click="goToContactForm">
              <span class="relative block">
                <span class="block size-12 rounded-full bg-jet transition-all duration-500 ease-smooth group-hover:w-full dark:bg-white" aria-hidden="true">
                  <span class="absolute inset-y-0 left-2.5 m-auto h-0.5 w-4.5 bg-transparent transition-all duration-500 ease-smooth group-hover:translate-x-4 group-hover:bg-white before:absolute before:-top-1 before:right-px before:size-2.5 before:rotate-45 before:border-t-2 before:border-r-2 before:border-white before:content-[''] dark:group-hover:bg-jet dark:before:border-jet" />
                </span>
                <span class="absolute inset-0 ml-[1.85rem] py-[0.9rem] text-center font-baron text-sm leading-[1.6rem] transition-all duration-500 ease-smooth group-hover:text-white sm:text-base dark:group-hover:text-jet">
                  Открыть
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bouton « Réserver » (téléphones) -->
      <div class="reveal-scale z-1 mt-2 flex h-[4vh] w-full items-center justify-center sm:hidden [--delay:2.6s] [--ease:var(--ease-back-out)] [--from-scale:0.7]">
        <button type="button" class="button h-full min-h-10 w-[65%] max-w-75 rounded-full" @click="goToContactForm">
          Открыть форму
        </button>
      </div>
    </section>

    <!-- ===================== À PROPOS ===================== -->
    <section class="my-[10vw] h-[70vh] min-h-100 sm:my-[10vh] sm:min-h-full">
      <div class="p-container">
        <div v-reveal="{ start: 1 }" class="grid w-full justify-items-center self-center">
          <p class="mx-auto w-full text-center text-[24.544px] leading-[1.9] font-extralight md:text-[3.2vw] 2xl:text-[53.76px] [--duration:0.6s] [--stagger:25ms]">
            <SplitText :text="ABOUT_PHRASE" class="cursor-text" />
          </p>
          <span class="reveal-fade-up mt-2 mb-4 w-[10%] border-t-2 border-current sm:mt-[1vw] sm:mb-[2vw] md:border-t-3" :style="{ '--delay': aboutLinksDelay }" />
          <NuxtLink to="/about" class="reveal-fade-up group relative flex content-center justify-center" :style="{ '--delay': aboutLinksDelay }">
            <span class="text-center font-baron text-[16.864px] lg:text-[1.7vw] 2xl:text-[28.56px]">О проекте</span>
            <IconArrow class="right-[-12%]" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===================== GALERIE ===================== -->
    <section class="py-[10vw] lg:py-[10vh]">
      <div class="relative m-auto grid max-w-[2500px] grid-cols-[repeat(11,1fr)] items-start px-[5vw] sm:px-[10vw]">
        <div
          v-reveal
          class="col-start-1 col-end-10 row-span-1 grid max-w-162.5 justify-items-start sm:col-start-7 sm:col-end-12 [--duration:1.4s]"
        >
          <span class="w-full cursor-text overflow-hidden font-baron text-[11.904px] lg:text-[1.2vw] 2xl:text-[20.16px]">
            <span class="reveal-up block">фотоколлекция</span>
          </span>
          <p class="w-full cursor-text text-[27.776px] font-thin lg:text-[2.8vw] 2xl:text-[47.04px]">
            <SplitText by="words" text="Пейзажи / Детали / Природа / Архитектура / Астрофото" />
          </p>
          <span class="reveal-fade-up mt-2 mb-4 w-1/5 border-t-2 border-current sm:mt-[1vw] sm:mb-[2vw] md:border-t-3 [--delay:0.8s] [--duration:1s]" />
          <NuxtLink to="/gallery" class="reveal-fade-up group relative flex content-center justify-center [--delay:0.8s] [--duration:1s]">
            <span class="text-center font-baron text-[16.864px] lg:text-[1.7vw] 2xl:text-[28.56px]">в галерею</span>
            <IconArrow class="right-[-18%]" />
          </NuxtLink>
        </div>

        <div
          v-for="photo in PORTFOLIO"
          :key="photo.file"
          v-reveal
          class="relative overflow-hidden bg-light-grey-alt dark:bg-dark-grey-alt"
          :class="[photo.layout, photo.portrait ? 'aspect-2/3' : 'aspect-3/2']"
        >
          <img
            :src="useRuntimeConfig().app.baseURL + 'demo/' + photo.file + '.webp'"
            :sizes="photo.portrait ? 'xl:518px 2xl:910px' : 'lg:518px xl:1273px'"
            :alt="photo.alt"
            loading="lazy"
            class="reveal-fade absolute inset-0 size-full object-cover [--duration:0.5s] [--ease:var(--ease-power1-out)]"
          />
        </div>
      </div>
    </section>

    <!-- ===================== CONTACT ===================== -->
    <ContactForm />
  </div>
</template>
