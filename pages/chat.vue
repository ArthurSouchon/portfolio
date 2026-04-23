<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('chat.meta_title'),
  description: () => t('chat.meta_desc'),
  ogTitle: () => t('chat.meta_title'),
  ogDescription: () => t('chat.meta_desc'),
})

interface Message {
  role: 'user' | 'assistant'
  content: string
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

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: t('chat.intro'),
  },
])

const input = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

async function sendMessage() {
  const text = input.value.trim()
  if (!text || isLoading.value) return
  if (text.length > 500) {
    error.value = t('chat.error_too_long')
    return
  }

  error.value = null
  input.value = ''

  messages.value.push({ role: 'user', content: text })
  await scrollToBottom()

  isLoading.value = true

  try {
    const data = await $fetch<{ reply: string }>('/api/chat', {
      method: 'POST',
      body: { message: text },
    })
    messages.value.push({ role: 'assistant', content: data.reply })
  } catch (err: any) {
    const status = err?.response?.status
    if (status === 429) {
      error.value = t('chat.error_rate_limit')
    } else if (status === 400) {
      error.value = t('chat.error_invalid')
    } else {
      error.value = t('chat.error_generic')
    }
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="pt-16 flex flex-col" style="height: 100dvh; min-height: 100dvh;">
    <!-- Header -->
    <div class="flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
      <div class="max-w-3xl mx-auto flex items-center gap-4">
        <div class="relative">
          <img src="/avatar.png" alt="Arthur Souchon" class="w-[33px] h-10 rounded-xl object-cover" />
          <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-200 dark:border-slate-950" />
        </div>
        <div>
          <h1 class="text-base font-semibold text-slate-900 dark:text-slate-100">{{ t('chat.assistant_name') }}</h1>
          <p class="text-xs text-emerald-400">{{ t('chat.online') }}</p>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      <div class="max-w-3xl mx-auto space-y-4">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start']"
        >
          <!-- Avatar assistant -->
          <div
            v-if="msg.role === 'assistant'"
            class="flex-shrink-0 mt-1"
          >
            <img src="/avatar.png" alt="Arthur Souchon" class="w-[26px] h-8 rounded-lg object-cover" />
          </div>

          <!-- Bulle -->
          <div
            :class="[
              'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-br-sm'
                : 'bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm',
            ]"
          >
            <span v-if="msg.role === 'assistant'" v-html="renderText(msg.content)" />
            <span v-else>{{ msg.content }}</span>
          </div>

          <!-- Avatar user -->
          <div
            v-if="msg.role === 'user'"
            class="w-8 h-8 rounded-lg bg-slate-300 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1"
          >
            <UIcon name="i-heroicons-user" class="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="flex gap-3 justify-start">
          <img src="/avatar.png" alt="Arthur Souchon" class="w-[26px] h-8 rounded-lg object-cover flex-shrink-0 mt-1" />
          <div class="bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
            <span class="typing-dot w-2 h-2 rounded-full bg-slate-400" style="animation-delay: 0ms" />
            <span class="typing-dot w-2 h-2 rounded-full bg-slate-400" style="animation-delay: 150ms" />
            <span class="typing-dot w-2 h-2 rounded-full bg-slate-400" style="animation-delay: 300ms" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="flex-shrink-0 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="mb-3 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 flex-shrink-0" />
          {{ error }}
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-end gap-3">
          <div class="flex-1 relative">
            <textarea
              v-model="input"
              :placeholder="t('chat.placeholder')"
              :maxlength="500"
              rows="1"
              class="w-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 resize-none outline-none transition-colors duration-200 pr-16"
              style="min-height: 48px; max-height: 160px; overflow-y: auto; field-sizing: content;"
              @keydown="handleKeydown"
            />
            <span class="absolute bottom-3 right-3 text-xs text-slate-500 dark:text-slate-600">
              {{ input.length }}/500
            </span>
          </div>
          <button
            :disabled="!input.trim() || isLoading"
            class="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5 disabled:hover:translate-y-0"
            @click="sendMessage"
          >
            <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 text-white" />
          </button>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-600 mt-2 text-center">{{ t('chat.disclaimer') }}</p>
      </div>
    </div>
  </div>
</template>
