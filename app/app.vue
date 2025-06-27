<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden">
    <div
      class="flex h-[50px] w-full flex-none items-center overflow-hidden border-b p-4"
    >
      <SessionsRoot />
    </div>

    <div class="w-full flex-1 overflow-hidden">
      <NuxtPage />
    </div>
  </div>
</template>
