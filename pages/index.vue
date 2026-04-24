<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('meta.home_title'),
  description: () => t('meta.home_desc'),
  ogTitle: () => t('meta.home_title'),
  ogDescription: () => t('meta.home_desc'),
})

const tools = [
  { name: 'n8n', color: 'text-orange-400' },
  { name: 'Make', color: 'text-purple-400' },
  { name: 'Zapier', color: 'text-amber-400' },
  { name: 'Claude Code', color: 'text-violet-400' },
  { name: 'GPT-4', color: 'text-emerald-400' },
  { name: 'Antigravity', color: 'text-blue-400' },
  { name: 'Notion', color: 'text-slate-700 dark:text-slate-300' },
  { name: 'Airtable', color: 'text-teal-400' },
  { name: 'HubSpot', color: 'text-orange-500' },
  { name: 'Linear', color: 'text-indigo-400' },
  { name: 'Figma', color: 'text-pink-400' },
  { name: 'Vercel', color: 'text-slate-800 dark:text-slate-200' },
]

const serviceIcons = ['i-heroicons-clipboard-document-list', 'i-heroicons-cog-6-tooth', 'i-heroicons-wrench-screwdriver']
const caseIcons = ['i-heroicons-book-open', 'i-heroicons-phone', 'i-heroicons-banknotes', 'i-heroicons-globe-alt']
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div class="hero-gradient" />

      <div class="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: -10 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm mb-12"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 online-dot" />
          {{ t('home.hero.badge') }}
        </div>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
          class="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight"
        >
          {{ t('home.hero.title') }}<br />
          <span class="gradient-text">{{ t('home.hero.title2') }}</span>
        </h1>

        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          class="mt-7 text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed"
        >
          {{ t('home.hero.subtitle') }}
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
          class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://calendar.app.google/KcUytrRx2duCQyQbA"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors duration-200"
          >
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
            {{ t('home.hero.cta') }}
          </a>
          <NuxtLink
            :to="localePath('/services')"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 font-medium text-sm transition-colors duration-200"
          >
            {{ t('home.hero.cta_secondary') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/60">
      <div class="max-w-5xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="mb-12"
        >
          <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3">{{ t('home.services.badge') }}</p>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{{ t('home.services.title') }}</h2>
          <p class="mt-2 text-slate-600 dark:text-slate-400 max-w-lg">{{ t('home.services.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(key, i) in ['s1', 's2', 's3']"
            :key="key"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 80 } }"
          >
            <NuxtLink
              :to="`${localePath('/services')}#${key}`"
              class="group block h-full p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200"
            >
              <UIcon :name="serviceIcons[i]" class="w-5 h-5 text-indigo-400 mb-4" />
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1.5 group-hover:text-indigo-300 transition-colors">
                {{ t(`home.services.${key}_title`) }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ t(`home.services.${key}_desc`) }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-8">
          <NuxtLink
            :to="localePath('/services')"
            class="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-400 transition-colors"
          >
            {{ t('home.services.cta') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- RÉALISATIONS -->
    <section class="py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 border-t border-b border-slate-100 dark:border-slate-800/60">
      <div class="max-w-5xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="mb-12"
        >
          <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3">{{ t('home.cases.badge') }}</p>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{{ t('home.cases.title') }}</h2>
          <p class="mt-2 text-slate-600 dark:text-slate-400">{{ t('home.cases.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(key, i) in ['c1', 'c2', 'c3']"
            :key="key"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 80 } }"
          >
            <NuxtLink
              :to="`${localePath('/realisations')}#${key}`"
              class="group block h-full p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200"
            >
              <div class="flex items-start gap-3 mb-3">
                <UIcon :name="caseIcons[i]" class="w-4 h-4 text-slate-500 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug">
                    {{ t(`realisations.cases.${key}.title`) }}
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{{ t(`realisations.cases.${key}.context`) }}</p>
                </div>
              </div>
              <p class="text-sm text-emerald-400 flex items-start gap-1.5">
                <UIcon name="i-heroicons-arrow-trending-up" class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {{ t(`realisations.cases.${key}.impact`) }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-8">
          <NuxtLink
            :to="localePath('/realisations')"
            class="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-400 transition-colors"
          >
            {{ t('home.cases.cta') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- STACK -->
    <section class="py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/60">
      <div class="max-w-5xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="mb-10"
        >
          <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3">{{ t('home.stack.badge') }}</p>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{{ t('home.stack.title') }}</h2>
          <p class="mt-2 text-slate-600 dark:text-slate-400">{{ t('home.stack.subtitle') }}</p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visibleOnce="{ opacity: 1, transition: { duration: 500 } }"
          class="flex flex-wrap gap-2"
        >
          <div
            v-for="tool in tools"
            :key="tool.name"
            class="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200"
          >
            <span :class="['text-sm font-medium', tool.color]">{{ tool.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/60">
      <div class="max-w-2xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 sm:p-16 text-center"
        >
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            {{ t('home.cta_section.title') }}
          </h2>
          <p class="text-slate-600 dark:text-slate-400 mb-8">
            {{ t('home.cta_section.subtitle') }}
          </p>
          <a
            href="https://calendar.app.google/KcUytrRx2duCQyQbA"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors duration-200"
          >
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
            {{ t('home.cta_section.button') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
