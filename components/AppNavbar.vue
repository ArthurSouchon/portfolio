<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const route = useRoute()

const navLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.services'), to: localePath('/services') },
  { label: t('nav.experience'), to: localePath('/experience') },
  { label: t('nav.realisations'), to: localePath('/realisations') },
  { label: t('nav.univers'), to: localePath('/univers') },
  { label: t('nav.chat'), to: localePath('/chat') },
])

const localePath = useLocalePath()
const mobileOpen = ref(false)
const langOpen = ref(false)

const langs = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

function switchLang(code: string) {
  setLocale(code as 'fr' | 'en')
  langOpen.value = false
}

watch(() => route.path, () => {
  mobileOpen.value = false
  langOpen.value = false
})

const colorMode = useColorMode()
function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const scrolled = ref(false)
onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.lang-dropdown')) langOpen.value = false
  })
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-lg shadow-black/20'
      : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo / Nom -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2 group">
          <img src="/favicon.png" alt="Arthur Souchon" class="w-8 h-[39px] rounded-lg object-cover" />
          <span class="font-semibold text-slate-900 dark:text-slate-100 hidden sm:block">Arthur Souchon</span>
        </NuxtLink>

        <!-- Navigation desktop -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            :class="route.path === link.to
              ? 'text-indigo-400 bg-indigo-500/10'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Actions droite -->
        <div class="flex items-center gap-2">
          <!-- Toggle dark/light -->
          <button
            @click="toggleTheme"
            class="flex items-center justify-center w-[34px] h-[34px] rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-150"
            :aria-label="colorMode.value === 'dark' ? 'Mode clair' : 'Mode sombre'"
          >
            <UIcon :name="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-4 h-4" />
          </button>

          <!-- Switcher langue -->
          <div class="relative lang-dropdown">
            <button
              @click="langOpen = !langOpen"
              class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-150"
            >
              <span>{{ langs.find(l => l.code === locale)?.flag }}</span>
              <span class="text-xs font-medium uppercase tracking-wide">{{ locale }}</span>
              <UIcon name="i-heroicons-chevron-down" :class="['w-3 h-3 transition-transform duration-150', langOpen ? 'rotate-180' : '']" />
            </button>
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all duration-100 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div
                v-if="langOpen"
                class="absolute right-0 top-full mt-1.5 w-36 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50"
              >
                <button
                  v-for="lang in langs"
                  :key="lang.code"
                  @click="switchLang(lang.code)"
                  :class="[
                    'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors duration-100',
                    locale === lang.code
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  ]"
                >
                  <span class="text-base">{{ lang.flag }}</span>
                  <span>{{ lang.label }}</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- CTA Calendly -->
          <a
            href="https://calendar.app.google/KcUytrRx2duCQyQbA"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-150"
          >
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
            {{ locale === 'fr' ? 'Prendre RDV' : 'Book a call' }}
          </a>

          <!-- Burger mobile -->
          <button
            class="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            @click="mobileOpen = !mobileOpen"
            :aria-label="mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          >
            <UIcon :name="mobileOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden bg-white/98 dark:bg-slate-950/98 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 pb-4"
      >
        <nav class="flex flex-col gap-1 pt-2">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="route.path === link.to
              ? 'text-indigo-400 bg-indigo-500/10'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            href="https://calendar.app.google/KcUytrRx2duCQyQbA"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
            {{ locale === 'fr' ? 'Prendre RDV' : 'Book a call' }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>
