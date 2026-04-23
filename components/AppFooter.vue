<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.services'), to: localePath('/services') },
  { label: t('nav.experience'), to: localePath('/experience') },
  { label: t('nav.realisations'), to: localePath('/realisations') },
  { label: t('nav.univers'), to: localePath('/univers') },
  { label: t('nav.chat'), to: localePath('/chat') },
])
</script>

<template>
  <footer class="border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 mt-auto">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div class="flex flex-col md:flex-row md:items-start justify-between gap-10">

        <!-- Gauche : identité -->
        <div class="space-y-4 max-w-xs">
          <div class="flex items-center gap-2.5">
            <img src="/favicon.png" alt="Arthur Souchon" class="w-8 h-[39px] rounded-lg object-cover" />
            <span class="font-semibold text-slate-900 dark:text-slate-100">Arthur Souchon</span>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/arthur-souchon-236807171/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors"
              aria-label="LinkedIn"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <span class="text-sm text-slate-500 dark:text-slate-400">arthursouchon98@gmail.com</span>
          </div>
        </div>

        <!-- Droite : nav + CTA -->
        <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-400 transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            href="https://calendar.app.google/KcUytrRx2duCQyQbA"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
            {{ t('footer.calendly') }}
          </a>
        </div>

      </div>

    </div>
  </footer>
</template>
