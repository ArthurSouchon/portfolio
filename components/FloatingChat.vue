<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// État du widget
const isOpen = ref(false)
const wasClosedByUser = ref(false)

// Masquer sur la page /chat (le widget est inutile là)
const isOnChatPage = computed(() =>
  route.path === localePath('/chat')
)

// Message contextuel selon la page courante
const contextMessage = computed(() => {
  const p = route.path
  if (p === localePath('/services')) return t('chat.widget.context.services')
  if (p === localePath('/experience')) return t('chat.widget.context.experience')
  if (p === localePath('/realisations')) return t('chat.widget.context.realisations')
  if (p === localePath('/univers')) return t('chat.widget.context.univers')
  return t('chat.widget.context.home')
})

// Mini-chat state
const messages = ref<{ role: 'assistant' | 'user'; text: string }[]>([])
const input = ref('')
const loading = ref(false)
const error = ref('')
const hasInteracted = ref(false)

// Auto-open après 10s sur desktop si pas déjà fermé
onMounted(() => {
  if (typeof window === 'undefined') return
  const closed = sessionStorage.getItem('chatWidgetClosed')
  if (closed) {
    wasClosedByUser.value = true
    return
  }
  if (window.innerWidth < 768) return // pas d'auto-open mobile

  setTimeout(() => {
    if (!wasClosedByUser.value && !isOnChatPage.value) {
      isOpen.value = true
    }
  }, 10000)
})

// Ne pas rouvrir au changement de route si l'user a fermé
watch(() => route.path, () => {
  if (isOnChatPage.value) isOpen.value = false
})

function openWidget() {
  if (!hasInteracted.value) {
    // Premier message d'accueil à l'ouverture
    messages.value = [{ role: 'assistant', text: t('chat.intro') }]
    hasInteracted.value = true
  }
  isOpen.value = true
}

function closeWidget() {
  isOpen.value = false
  wasClosedByUser.value = true
  sessionStorage.setItem('chatWidgetClosed', '1')
}

async function sendMessage() {
  const msg = input.value.trim().slice(0, 500)
  if (!msg || loading.value) return

  messages.value.push({ role: 'user', text: msg })
  input.value = ''
  loading.value = true
  error.value = ''

  try {
    const res = await $fetch<{ reply: string }>('/api/chat', {
      method: 'POST',
      body: { message: msg },
    })
    messages.value.push({ role: 'assistant', text: res.reply })
  } catch (err: any) {
    const status = err?.statusCode || err?.status
    if (status === 429) {
      error.value = t('chat.limit_error')
    } else {
      error.value = t('chat.generic_error')
    }
  } finally {
    loading.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function renderText(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  return escaped.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline text-indigo-400 hover:text-indigo-300 break-all">$1</a>'
  )
}

// Scroll auto vers le bas à chaque nouveau message
const messagesEl = ref<HTMLElement>()
watch(messages, async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}, { deep: true })
</script>

<template>
  <!-- Widget masqué sur la page /chat -->
  <div v-if="!isOnChatPage" class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

    <!-- Fenêtre de mini-chat -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="w-[340px] max-h-[480px] flex flex-col rounded-2xl border border-slate-300/60 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900 shadow-2xl shadow-black/50 overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-300/60 dark:border-slate-700/60 bg-slate-100/50 dark:bg-slate-800/50">
          <div class="flex items-center gap-2.5">
            <div class="relative">
              <img src="/avatar.png" alt="Arthur" class="w-8 h-8 rounded-full object-cover" />
              <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-200 dark:border-slate-800 online-dot" />
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">Arthur</p>
              <p class="text-xs text-emerald-400">{{ t('chat.widget.online') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <NuxtLink
              :to="localePath('/chat')"
              class="p-1.5 rounded-lg text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:bg-slate-700 transition-colors"
              :title="locale === 'fr' ? 'Ouvrir en plein écran' : 'Open fullscreen'"
            >
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
            </NuxtLink>
            <button
              @click="closeWidget"
              class="p-1.5 rounded-lg text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:bg-slate-700 transition-colors"
              :aria-label="t('chat.widget.close')"
            >
              <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div
          ref="messagesEl"
          class="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-64"
        >
          <!-- Bulle contextuelle si pas encore d'interaction -->
          <div v-if="!hasInteracted" class="flex gap-2">
            <img src="/avatar.png" alt="Arthur" class="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-0.5" />
            <div class="bg-slate-200 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[240px]">
              <p class="text-sm text-slate-800 dark:text-slate-200">{{ contextMessage }}</p>
            </div>
          </div>

          <template v-for="(msg, i) in messages" :key="i">
            <!-- Message assistant -->
            <div v-if="msg.role === 'assistant'" class="flex gap-2">
              <img src="/avatar.png" alt="Arthur" class="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-0.5" />
              <div class="bg-slate-200 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[240px]">
                <p class="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap" v-html="renderText(msg.text)" />
              </div>
            </div>
            <!-- Message utilisateur -->
            <div v-else class="flex justify-end">
              <div class="bg-indigo-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[240px]">
                <p class="text-sm text-white">{{ msg.text }}</p>
              </div>
            </div>
          </template>

          <!-- Indicateur de frappe -->
          <div v-if="loading" class="flex gap-2">
            <img src="/avatar.png" alt="Arthur" class="w-6 h-6 rounded-full object-cover flex-shrink-0" />
            <div class="bg-slate-200 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2.5 flex gap-1 items-center">
              <span v-for="n in 3" :key="n" class="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
            </div>
          </div>

          <!-- Erreur -->
          <p v-if="error" class="text-xs text-red-400 text-center">{{ error }}</p>
        </div>

        <!-- Input -->
        <div class="p-3 border-t border-slate-300/60 dark:border-slate-700/60">
          <div class="flex gap-2">
            <input
              v-model="input"
              @keydown="handleKeydown"
              :placeholder="t('chat.placeholder')"
              :disabled="loading"
              maxlength="500"
              class="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors min-w-0"
            />
            <button
              @click="sendMessage"
              :disabled="loading || !input.trim()"
              class="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            >
              <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Bulle flottante -->
    <button
      v-if="!isOpen"
      @click="openWidget"
      class="relative w-[46px] h-14 rounded-2xl overflow-hidden shadow-lg shadow-black/20 transition-all duration-200 hover:scale-105 chat-bubble-pulse"
      :aria-label="t('chat.widget.open')"
    >
      <img src="/avatar.png" alt="Arthur" class="w-full h-full object-cover" />
      <!-- Point vert online -->
      <span class="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-200 dark:border-slate-950 online-dot" />
    </button>
  </div>
</template>
