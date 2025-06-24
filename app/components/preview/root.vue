<template>
  <div>
    <PreviewHtml
      v-if="preview.lang === 'html'"
      class="size-full"
      :code="preview.value"
    />
    <div v-else class="size-full">{{ preview.value }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Preview } from '~/components/preview/types';

defineProps<{
  preview: Preview;
}>();
</script>
