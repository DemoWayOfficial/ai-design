<template>
  <div :class="cn('flex', props.class)">
    <div class="w-1/2 flex-none">preview</div>
    <div class="flex w-1/2 flex-none flex-col border-l">
      <chat-messages class="flex-1" :messages="messages" />
      <chat-input
        v-model="input"
        class="flex-none border-t p-2"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LanguageModelV1 } from '@ai-sdk/provider';
import type { ClassValue } from 'clsx';

import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
  sessionId: string;
  model: LanguageModelV1;
}>();

const { messages, input, handleSubmit } = useChat({
  model: () => props.model,
  sessionId: () => props.sessionId,
});

function onSubmit() {
  handleSubmit();
}
</script>
