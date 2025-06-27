<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden">
    <div
      class="flex h-[60px] w-full flex-none items-center overflow-hidden border-b p-4"
    >
      <SessionsRoot />
    </div>

    <div class="w-full flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
