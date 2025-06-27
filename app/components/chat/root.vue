<template>
  <div :class="cn('bg-muted flex gap-4 p-4', props.class)">
    <PreviewRoot v-model:active="active" :previews="previews" />

    <div class="flex w-md flex-none flex-col gap-2 overflow-hidden">
      <chat-messages class="flex-1" :messages="messages" />
      <chat-input
        v-model="input"
        class="bg-background flex-none"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import type { LanguageModelV1 } from '@ai-sdk/provider';
import type { ClassValue } from 'clsx';
import { lexer } from 'marked';

import type { Preview } from '~/components/preview/types';
import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
  sessionId: string;
  model: LanguageModelV1;
}>();

const previews = ref<Preview[]>([]);

const active = ref<string>();

const { messages, input, handleSubmit } = useChat({
  model: () => props.model,
  sessionId: () => props.sessionId,
  onFinish(message) {
    const tokens = lexer(message.content);

    for (const token of tokens) {
      if (token.type === 'code') {
        previews.value.push({
          id: String(previews.value.length),
          lang: token.lang ?? 'plain-text',
          value: token.text,
        });
      }
    }

    if (!active.value) {
      active.value = previews.value.at(-1)?.id;
    }
  },
  onRestore(messages) {
    for (const message of messages) {
      if (message.role !== 'assistant') {
        continue;
      }

      const tokens = lexer(message.content);

      for (const token of tokens) {
        if (token.type === 'code') {
          previews.value.push({
            id: String(previews.value.length),
            lang: token.lang ?? 'plain-text',
            value: token.text,
          });
        }
      }
    }

    if (!active.value) {
      active.value = previews.value.at(-1)?.id;
    }
  },
});

function onSubmit() {
  handleSubmit();
}
</script>
