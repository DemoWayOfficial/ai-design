<template>
  <li>
    <NuxtLink
      class="hover:bg-muted [&.router-link-active]:bg-muted flex h-9 w-full cursor-pointer overflow-hidden rounded px-4 py-2"
      :to="`/chat/${session.id}`"
    >
      <span class="w-full truncate">
        {{ session.name }}
      </span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  session: Session;
}>();
</script>
