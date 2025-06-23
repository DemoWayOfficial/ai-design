<template>
  <div :class="cn('flex', props.class)">
    <div class="flex-1/2">preview</div>
    <div class="flex flex-1/2 flex-col border-l">
      <chat-messages class="flex-1" :messages="messages" />
      <chat-input v-model="input" class="flex-none p-2" @submit="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LanguageModelV1 } from '@ai-sdk/provider';
import type { ClassValue } from 'clsx';

import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
  model: LanguageModelV1;
}>();

const { messages, input, handleSubmit } = useChat(() => props.model);

function onSubmit() {
  handleSubmit();
}
</script>
