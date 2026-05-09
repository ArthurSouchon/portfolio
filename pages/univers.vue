<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('univers.meta_title'),
  description: () => t('univers.meta_desc'),
  ogTitle: () => t('univers.meta_title'),
  ogDescription: () => t('univers.meta_desc'),
  ogImage: 'https://arthursouchon.pm/og-image.jpg',
})

</script>

<template>
  <div class="pt-16">
    <!-- Hero de page -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8 page-hero">
      <div class="max-w-5xl mx-auto">
        <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">{{ t('univers.badge') }}</p>
        <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">{{ t('univers.title') }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">{{ t('univers.subtitle') }}</p>
      </div>
    </section>

    <section class="pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto space-y-10">

        <!-- PADEL -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <!-- Colonne couleur -->
            <div class="lg:col-span-2 relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between overflow-hidden"
              style="background-image: url('/padel-bg.jpg'); background-size: cover; background-position: center;">
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-amber-900/80 to-orange-900/80 dark:from-amber-950/85 dark:to-orange-950/85" />
              <div class="relative z-10">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <UIcon name="i-heroicons-trophy" class="w-3.5 h-3.5" />
                  {{ t('univers.padel.badge') }}
                </span>
                <h2 class="text-2xl font-bold text-white mb-2">{{ t('univers.padel.title') }}</h2>
              </div>

              <!-- Stats -->
              <div class="relative z-10 grid grid-cols-3 gap-4 mt-8">
                <div class="text-center">
                  <p class="text-2xl font-bold text-amber-400">{{ t('univers.padel.stats.level') }}</p>
                  <p class="text-xs text-amber-200/70 mt-1">{{ t('univers.padel.stats.level_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-amber-400">{{ t('univers.padel.stats.years') }}</p>
                  <p class="text-xs text-amber-200/70 mt-1">{{ t('univers.padel.stats.years_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-amber-400">{{ t('univers.padel.stats.sessions') }}</p>
                  <p class="text-xs text-amber-200/70 mt-1">{{ t('univers.padel.stats.sessions_label') }}</p>
                </div>
              </div>
            </div>

            <!-- Texte -->
            <div class="lg:col-span-3 p-8 flex flex-col justify-center gap-5">
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ t('univers.padel.desc1') }}</p>
              <div class="h-px bg-slate-200 dark:bg-slate-800" />
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed italic">{{ t('univers.padel.desc2') }}</p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 pt-2">
                <span v-for="tag in ['Compétition', 'Tactique', 'Mental', 'Régularité']" :key="tag"
                  class="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ÉVÉNEMENT -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
          class="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <div class="lg:col-span-2 relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between overflow-hidden"
              style="background-image: url('/evenement-bg.jpg'); background-size: cover; background-position: center;">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-teal-900/80 dark:from-emerald-950/85 dark:to-teal-950/85" />
              <div class="relative z-10">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <UIcon name="i-heroicons-calendar-days" class="w-3.5 h-3.5" />
                  {{ t('univers.evenement.badge') }}
                </span>
                <h2 class="text-2xl font-bold text-white mb-2">{{ t('univers.evenement.title') }}</h2>
              </div>
              <div class="relative z-10 grid grid-cols-3 gap-4 mt-8">
                <div class="text-center">
                  <p class="text-2xl font-bold text-emerald-400">{{ t('univers.evenement.stats.events') }}</p>
                  <p class="text-xs text-emerald-200/70 mt-1">{{ t('univers.evenement.stats.events_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-emerald-400">{{ t('univers.evenement.stats.participants') }}</p>
                  <p class="text-xs text-emerald-200/70 mt-1">{{ t('univers.evenement.stats.participants_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-emerald-400">{{ t('univers.evenement.stats.years') }}</p>
                  <p class="text-xs text-emerald-200/70 mt-1">{{ t('univers.evenement.stats.years_label') }}</p>
                </div>
              </div>
            </div>
            <div class="lg:col-span-3 p-8 flex flex-col justify-center gap-5">
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ t('univers.evenement.desc1') }}</p>
              <div class="h-px bg-slate-200 dark:bg-slate-800" />
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed italic">{{ t('univers.evenement.desc2') }}</p>
              <div class="flex flex-wrap gap-2 pt-2">
                <span v-for="tag in ['Logistique', 'Coordination', 'Communication', 'Gestion de crise']" :key="tag"
                  class="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ESPORT -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          class="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <div class="lg:col-span-2 relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between overflow-hidden"
              style="background-image: url('/esport-bg.jpg'); background-size: cover; background-position: center;">
              <div class="absolute inset-0 bg-gradient-to-br from-violet-900/80 to-indigo-900/80 dark:from-violet-950/85 dark:to-indigo-950/85" />
              <div class="relative z-10">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <UIcon name="i-heroicons-star" class="w-3.5 h-3.5" />
                  {{ t('univers.esport.badge') }}
                </span>
                <h2 class="text-2xl font-bold text-white mb-2">{{ t('univers.esport.title') }}</h2>
              </div>
              <div class="relative z-10 grid grid-cols-3 gap-4 mt-8">
                <div class="text-center">
                  <p class="text-xl font-bold text-violet-400">{{ t('univers.esport.stats.achievement') }}</p>
                  <p class="text-xs text-violet-200/70 mt-1">{{ t('univers.esport.stats.achievement_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-xl font-bold text-violet-400">{{ t('univers.esport.stats.tournament') }}</p>
                  <p class="text-xs text-violet-200/70 mt-1">{{ t('univers.esport.stats.tournament_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-violet-400">{{ t('univers.esport.stats.year') }}</p>
                  <p class="text-xs text-violet-200/70 mt-1">{{ t('univers.esport.stats.year_label') }}</p>
                </div>
              </div>
            </div>
            <div class="lg:col-span-3 p-8 flex flex-col justify-center gap-5">
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ t('univers.esport.desc1') }}</p>
              <div class="h-px bg-slate-200 dark:bg-slate-800" />
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed italic">{{ t('univers.esport.desc2') }}</p>
              <div class="flex flex-wrap gap-2 pt-2">
                <span v-for="tag in ['Performance', 'Mental compétiteur', 'Systèmes complexes', 'Collectif']" :key="tag"
                  class="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- FOOTBALL -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
          class="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <div class="lg:col-span-2 relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between overflow-hidden"
              style="background-image: url('/football-bg.jpg'); background-size: cover; background-position: center;">
              <div class="absolute inset-0 bg-gradient-to-br from-sky-900/80 to-blue-900/80 dark:from-sky-950/85 dark:to-blue-950/85" />
              <div class="relative z-10">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/25 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <UIcon name="i-heroicons-trophy" class="w-3.5 h-3.5" />
                  {{ t('univers.football.badge') }}
                </span>
                <h2 class="text-2xl font-bold text-white mb-2">{{ t('univers.football.title') }}</h2>
              </div>
              <div class="relative z-10 grid grid-cols-3 gap-4 mt-8">
                <div class="text-center">
                  <p class="text-2xl font-bold text-sky-400">{{ t('univers.football.stats.years') }}</p>
                  <p class="text-xs text-sky-200/70 mt-1">{{ t('univers.football.stats.years_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-sky-400">{{ t('univers.football.stats.position') }}</p>
                  <p class="text-xs text-sky-200/70 mt-1">{{ t('univers.football.stats.position_label') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-sky-400">{{ t('univers.football.stats.sessions') }}</p>
                  <p class="text-xs text-sky-200/70 mt-1">{{ t('univers.football.stats.sessions_label') }}</p>
                </div>
              </div>
            </div>
            <div class="lg:col-span-3 p-8 flex flex-col justify-center gap-5">
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ t('univers.football.desc1') }}</p>
              <div class="h-px bg-slate-200 dark:bg-slate-800" />
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed italic">{{ t('univers.football.desc2') }}</p>
              <div class="flex flex-wrap gap-2 pt-2">
                <span v-for="tag in ['Amitié', 'PSG', 'Five', 'Passion']" :key="tag"
                  class="px-2.5 py-1 rounded-lg bg-sky-500/10 border bg-sky-500/20 text-sky-400 text-xs font-medium">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Citation -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 text-center"
        >
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-indigo-400 mx-auto mb-4" />
          <blockquote class="text-lg sm:text-xl text-slate-700 dark:text-slate-300 italic leading-relaxed max-w-2xl mx-auto">
            "{{ t('univers.quote') }}"
          </blockquote>
          <p class="mt-4 text-sm text-indigo-400 font-semibold">— Arthur Souchon</p>
        </div>
      </div>
    </section>
  </div>
</template>
