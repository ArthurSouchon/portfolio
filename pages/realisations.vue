<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('realisations.meta_title'),
  description: () => t('realisations.meta_desc'),
  ogTitle: () => t('realisations.meta_title'),
  ogDescription: () => t('realisations.meta_desc'),
  ogImage: 'https://arthursouchon.pm/og-image.jpg',
})


const cases = ['c1', 'c2', 'c3', 'c4']

const caseIcons = [
  'i-heroicons-book-open',        // Documentation API
  'i-heroicons-phone',               // WhatsApp
  'i-heroicons-banknotes',        // Relances impayés
  'i-heroicons-globe-alt',        // Portfolio
]

const caseGradients = [
  'from-amber-500/10 to-orange-500/10 border-amber-500/20',
  'from-emerald-500/10 to-teal-500/10 border-emerald-500/20',
  'from-violet-500/10 to-purple-500/10 border-violet-500/20',
  'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
]

const caseIconColors = [
  'text-amber-400 bg-amber-500/10',
  'text-emerald-400 bg-emerald-500/10',
  'text-violet-400 bg-violet-500/10',
  'text-blue-400 bg-blue-500/10',
]
</script>

<template>
  <div class="pt-16">
    <!-- Hero de page -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8 page-hero">
      <div class="max-w-5xl mx-auto">
        <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">{{ t('realisations.badge') }}</p>
        <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">{{ t('realisations.title') }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">{{ t('realisations.subtitle') }}</p>
      </div>
    </section>

    <!-- Cas clients -->
    <section class="pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto space-y-10">
        <div
          v-for="(cas, i) in cases"
          :key="cas"
          :id="cas"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 80 } }"
          class="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden scroll-mt-24"
        >
          <div class="bg-slate-50/80 dark:bg-slate-900/80 p-8">
            <!-- Header cas -->
            <div class="flex items-start gap-4 mb-6">
              <div :class="['w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', caseIconColors[i].split(' ')[1]]">
                <UIcon :name="caseIcons[i]" :class="['w-6 h-6', caseIconColors[i].split(' ')[0]]" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {{ t(`realisations.cases.${cas}.title`) }}
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-500 mt-0.5">
                  {{ t(`realisations.cases.${cas}.context`) }}
                </p>
                <p class="text-xs text-indigo-500 dark:text-indigo-400 font-medium mt-1">
                  {{ t(`realisations.cases.${cas}.role`) }}
                </p>
              </div>
            </div>

            <!-- Problème → Solution → Impact -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <!-- Problème -->
              <div class="rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/40 p-4">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <UIcon name="i-heroicons-exclamation-triangle" class="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <h3 class="text-xs font-semibold uppercase tracking-wider text-red-400">
                    {{ t('realisations.problem') }}
                  </h3>
                </div>
                <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {{ t(`realisations.cases.${cas}.problem`) }}
                </p>
              </div>

              <!-- Solution -->
              <div class="rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/40 p-4">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <UIcon name="i-heroicons-light-bulb" class="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <h3 class="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    {{ t('realisations.solution') }}
                  </h3>
                </div>
                <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {{ t(`realisations.cases.${cas}.solution`) }}
                </p>
              </div>

              <!-- Impact -->
              <div class="rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/40 p-4">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <UIcon name="i-heroicons-arrow-trending-up" class="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <h3 class="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {{ t('realisations.impact') }}
                  </h3>
                </div>
                <p class="text-sm font-semibold text-emerald-300 leading-relaxed">
                  {{ t(`realisations.cases.${cas}.impact`) }}
                </p>
              </div>
            </div>

            <!-- Stack -->
            <div class="mt-5 flex items-center gap-3 flex-wrap">
              <span class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold">{{ t('realisations.stack_label') }}</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tool, idx) in (tm(`realisations.cases.${cas}.stack`) as any[])"
                  :key="idx"
                  class="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  {{ rt(tool) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="max-w-5xl mx-auto mt-16 text-center">
        <p class="text-slate-600 dark:text-slate-400 mb-6">{{ t('home.cta_section.subtitle') }}</p>
        <a
          href="https://calendar.app.google/KcUytrRx2duCQyQbA"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 hover:-translate-y-0.5"
        >
          <UIcon name="i-heroicons-calendar-days" class="w-5 h-5" />
          {{ t('home.cta_section.button') }}
        </a>
      </div>
    </section>
  </div>
</template>
