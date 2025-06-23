<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <ChatRoot class="size-full" :model="model" />
  </div>
</template>

<script setup lang="ts">
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const provider = createOpenAICompatible({
  name: 'test',
  apiKey: import.meta.env['VITE_API_KEY'],
  baseURL: import.meta.env['VITE_OPENAI_BASE_URL'],
});

const model = provider('qwen2.5-3b-instruct');
</script>
