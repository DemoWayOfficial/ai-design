<template>
  <div
    :class="
      cn(
        messageVariants({
          role: message.role,
        }),
      )
    "
  >
    <MessageRendererChildren :tokens="tokens" :raw="message.content" />
  </div>
</template>

<script setup lang="ts">
import type { UIMessage } from '@ai-sdk/vue';
import { lexer } from 'marked';

import { messageVariants } from '~/components/message/variants';
import { cn } from '~/lib/utils';

const props = defineProps<{
  message: UIMessage;
}>();

const tokens = computed(() => {
  return lexer(props.message.content);
});
</script>
