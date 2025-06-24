<template>
  <ChatRoot
    class="size-full"
    :model="model"
    :session-id="String(route.params.id)"
  />
</template>

<script setup lang="ts">
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

definePageMeta({
  key: (route) => String(route.params.id),
});

const provider = createOpenAICompatible({
  name: 'test',
  apiKey: import.meta.env['VITE_API_KEY'],
  baseURL: import.meta.env['VITE_OPENAI_BASE_URL'],
});

const model = provider('qwen2.5-3b-instruct');

const route = useRoute();
</script>
