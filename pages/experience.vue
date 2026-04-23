<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('experience.meta_title'),
  description: () => t('experience.meta_desc'),
  ogTitle: () => t('experience.meta_title'),
  ogDescription: () => t('experience.meta_desc'),
})

const jobs = ['j1', 'j2', 'j3', 'j4', 'j5']

const jobIcons = [
  'i-heroicons-briefcase',
  'i-heroicons-cpu-chip',
  'i-heroicons-bolt',
  'i-heroicons-puzzle-piece',
  'i-heroicons-chart-bar-square',
]
</script>

<template>
  <div class="pt-16">
    <!-- Hero de page -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8 page-hero">
      <div class="max-w-5xl mx-auto">
        <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">{{ t('experience.badge') }}</p>
        <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">{{ t('experience.title') }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">{{ t('experience.subtitle') }}</p>
      </div>
    </section>

    <!-- Timeline -->
    <section class="pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="relative">
          <!-- Ligne verticale -->
          <div class="timeline-line" />

          <!-- Entrées -->
          <div class="space-y-10 pl-14">
            <div
              v-for="(job, i) in jobs"
              :key="job"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 500, delay: i * 80 } }"
              class="relative"
            >
              <!-- Point sur la ligne -->
              <div class="absolute -left-14 top-1">
                <div class="timeline-dot">
                  <UIcon :name="jobIcons[i]" class="w-4 h-4 text-indigo-400" />
                </div>
              </div>

              <!-- Carte -->
              <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                <!-- Header -->
                <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {{ t(`experience.jobs.${job}.title`) }}
                    </h2>
                    <p class="text-indigo-400 font-medium text-sm mt-0.5">
                      {{ t(`experience.jobs.${job}.company`) }}
                    </p>
                  </div>
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium flex-shrink-0">
                    <UIcon name="i-heroicons-calendar" class="w-3.5 h-3.5" />
                    {{ t(`experience.jobs.${job}.period`) }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {{ t(`experience.jobs.${job}.desc`) }}
                </p>

                <!-- Compétences -->
                <div>
                  <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">{{ t('experience.skills_label') }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(skill, idx) in (tm(`experience.jobs.${job}.skills`) as any[])"
                      :key="idx"
                      class="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      {{ rt(skill) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
