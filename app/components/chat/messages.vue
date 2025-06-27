<template>
  <ui-scroll-area
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
  </ui-scroll-area>
</template>

<script setup lang="ts">
import type { UIMessage } from '@ai-sdk/vue';
import type { ClassValue } from 'clsx';
import type { ComponentExposed } from 'vue-component-type-helpers';

import type { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
  messages: UIMessage[];
}>();

const container = ref<ComponentExposed<typeof ScrollArea>>();
const content = ref<HTMLElement>();

const manualScroll = ref(false);

function onWheel() {
  const el = container.value?.$el.querySelector(
    '[data-reka-scroll-area-viewport]',
  );
  if (!el) {
    return;
  }
  manualScroll.value = el.scrollTop + el.clientHeight !== el.scrollHeight;
}

function setScroll() {
  if (!container.value) {
    return;
  }

  const el = container.value.$el.querySelector(
    '[data-reka-scroll-area-viewport]',
  );

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
