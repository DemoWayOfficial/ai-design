<template>
  <div>
    <PreviewHtml
      v-if="preview.lang === 'html'"
      class="size-full"
      :code="preview.value"
    />
    <LazyMonacoEditor
      v-else
      class="size-full"
      :default-value="preview.value"
      :language="preview.lang"
    />
  </div>
</template>

<script setup lang="ts">
import type { Preview } from '~/components/preview/types';

defineProps<{
  preview: Preview;
}>();
</script>
