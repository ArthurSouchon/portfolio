<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="w-full h-full flex items-center justify-between px-20" style="background: #0f172a; font-family: Inter, sans-serif;">

    <!-- Avatar -->
    <img
      src="/avatar.png"
      style="width: 200px; height: 245px; border-radius: 20px; object-fit: cover; flex-shrink: 0;"
    />

    <!-- Text -->
    <div style="flex: 1; padding-left: 60px; display: flex; flex-direction: column; gap: 16px;">
      <div style="font-size: 48px; font-weight: 700; color: #f1f5f9; line-height: 1.1;">
        Arthur Souchon
      </div>
      <div style="font-size: 28px; font-weight: 500; color: #818cf8; line-height: 1.3;">
        PM & Automation<br />Product Builder
      </div>
      <div style="font-size: 18px; color: #64748b; margin-top: 8px;">
        arthur-souchon.com
      </div>
    </div>

  </div>
</template>
