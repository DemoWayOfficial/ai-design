<template>
  <iframe sandbox="allow-same-origin allow-scripts" :srcdoc="code" />
</template>

<script setup lang="ts">
defineProps<{
  code: string;
}>();
</script>
