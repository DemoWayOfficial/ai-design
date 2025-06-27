<template>
  <div :class="cn('flex gap-4 p-4', props.class)">
    <ui-tabs
      v-model="activeTab"
      class="flex-1 overflow-hidden rounded-xl border shadow"
    >
      <ui-tabs-content
        v-for="preview of previews"
        :key="preview.id"
        :value="preview.id"
      >
        <PreviewRoot class="size-full" :preview="preview">preview</PreviewRoot>
      </ui-tabs-content>

      <ui-tabs-list class="border-t">
        <ui-tabs-trigger
          v-for="preview of previews"
          :key="preview.id"
          :value="preview.id"
        >
          {{ `${preview.id}.${preview.lang}` }}
        </ui-tabs-trigger>
      </ui-tabs-list>
    </ui-tabs>

    <div class="flex w-md flex-none flex-col overflow-hidden">
      <chat-messages class="flex-1" :messages="messages" />
      <chat-input
        v-model="input"
        class="flex-none border-t"
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

const activeTab = ref<string>();

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

    if (!activeTab.value) {
      activeTab.value = previews.value.at(-1)?.id;
    }
  },
});

function onSubmit() {
  handleSubmit();
}
</script>
