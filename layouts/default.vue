<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
