<template>
  <ui-scroll-area :class="cn('overflow-hidden', props.class)">
    <MessageRoot
      v-for="message of messages"
      :key="message.id"
      :message="message"
    />
  </ui-scroll-area>
</template>

<script setup lang="ts">
import type { UIMessage } from '@ai-sdk/vue';
import type { ClassValue } from 'clsx';

import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
  messages: UIMessage[];
}>();
</script>
