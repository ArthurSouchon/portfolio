<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('services.meta_title'),
  description: () => t('services.meta_desc'),
  ogTitle: () => t('services.meta_title'),
  ogDescription: () => t('services.meta_desc'),
})

defineOgImage({ component: 'Default' })

const services = [
  { key: 's1', icon: 'i-heroicons-clipboard-document-list', number: '01' },
  { key: 's2', icon: 'i-heroicons-cog-6-tooth', number: '02' },
  { key: 's3', icon: 'i-heroicons-wrench-screwdriver', number: '03' },
]

const faqs = ['q1', 'q2', 'q3']
const openFaq = ref<string | null>(null)

function toggleFaq(key: string) {
  openFaq.value = openFaq.value === key ? null : key
}
</script>

<template>
  <div class="pt-16">
    <!-- Hero -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8 page-hero">
      <div class="max-w-5xl mx-auto">
        <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">{{ t('services.badge') }}</p>
        <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">{{ t('services.title') }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-xl">{{ t('services.subtitle') }}</p>
      </div>
    </section>

    <!-- Services -->
    <section class="pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div
          v-for="(svc, i) in services"
          :key="svc.key"
          :id="svc.key"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 80 } }"
          :class="['py-12 scroll-mt-24', i < services.length - 1 ? 'border-b border-slate-200 dark:border-slate-800' : '']"
        >
          <!-- Numéro + titre -->
          <div class="flex items-start gap-6 mb-6">
            <span class="text-3xl font-bold text-slate-200 dark:text-slate-800 select-none tabular-nums leading-none mt-1">{{ svc.number }}</span>
            <div>
              <div class="flex items-center gap-2.5 mb-2">
                <UIcon :name="svc.icon" class="w-5 h-5 text-indigo-400" />
                <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">{{ t(`services.${svc.key}.title`) }}</h2>
              </div>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">{{ t(`services.${svc.key}.desc`) }}</p>
            </div>
          </div>

          <!-- Pour qui -->
          <div class="ml-14 mb-6">
            <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-2">{{ t('services.for_who') }}</p>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{{ t(`services.${svc.key}.for_who`) }}</p>
          </div>

          <!-- Inclus -->
          <div class="ml-14 mb-8">
            <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3">{{ t('services.includes') }}</p>
            <ul class="flex flex-col gap-2">
              <li
                v-for="(item, idx) in (tm(`services.${svc.key}.includes`) as any[])"
                :key="idx"
                class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                {{ rt(item) }}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">{{ t('services.cta_section.badge') }}</p>
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">{{ t('services.cta_section.title') }}</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">{{ t('services.cta_section.subtitle') }}</p>
        <a
          href="https://calendar.app.google/KcUytrRx2duCQyQbA"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors duration-200"
        >
          <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
          {{ t('services.cta') }}
        </a>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
      <div class="max-w-3xl mx-auto">
        <p class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">{{ t('services.faq.badge') }}</p>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-10">{{ t('services.faq.title') }}</h2>

        <div class="space-y-0">
          <div
            v-for="q in faqs"
            :key="q"
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 350 } }"
            class="border-b border-slate-200 dark:border-slate-800"
          >
            <button
              class="w-full flex items-center justify-between py-5 text-left gap-4"
              @click="toggleFaq(q)"
            >
              <span class="font-medium text-slate-800 dark:text-slate-200 text-sm">{{ t(`services.faq.${q}`) }}</span>
              <UIcon
                name="i-heroicons-plus"
                :class="['w-4 h-4 text-slate-500 dark:text-slate-500 flex-shrink-0 transition-transform duration-200', openFaq === q ? 'rotate-45' : '']"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === q" class="pb-5">
                <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {{ t(`services.faq.${q.replace('q', 'a')}`) }}
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
