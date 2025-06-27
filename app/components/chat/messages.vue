<template>
  <div
    ref="container"
    :class="cn('overflow-x-hidden overflow-y-auto', props.class)"
    @wheel="onWheel"
  >
    <div ref="content" class="space-y-4 p-4">
      <MessageRoot
        v-for="message of messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UIMessage } from '@ai-sdk/vue';
import type { ClassValue } from 'clsx';

import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
  messages: UIMessage[];
}>();

const container = ref<HTMLElement>();
const content = ref<HTMLElement>();

const manualScroll = ref(false);

function onWheel() {
  const el = container.value;
  if (!el) {
    return;
  }
  manualScroll.value = el.scrollTop + el.clientHeight !== el.scrollHeight;
}

function setScroll() {
  const el = container.value;
  if (manualScroll.value || !el) {
    return;
  }
  el.scrollTop = el.scrollHeight - el.clientHeight;
}

useResizeObserver(content, () => {
  setScroll();
});

onMounted(() => {
  setScroll();
});
</script>
