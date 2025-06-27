<template>
  <PreviewHtml
    v-if="mode === 'preview'"
    class="size-full"
    :code="preview.value"
  />
  <LazyMonacoEditor
    v-else
    class="size-full"
    :default-value="preview.value"
    :language="language"
  />
</template>

<script setup lang="ts">
import type { Preview } from '~/components/preview/types';

const props = defineProps<{
  preview: Preview;
  mode: 'code' | 'preview';
}>();

const language = computed(() => {
  const { preview } = props;
  if (!preview?.lang) {
    return 'text';
  }
  switch (preview.lang) {
    case 'js':
      return 'javascript';
    case 'ts':
      return 'typescript';
    default:
      return preview.lang;
  }
});
</script>
