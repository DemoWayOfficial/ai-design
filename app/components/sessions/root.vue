<template>
  <div
    :class="
      cn('flex w-[200px] flex-none flex-col overflow-hidden', props.class)
    "
  >
    <div class="mb-6 flex-none border-b px-6 py-3">
      <ui-button class="rounded-full" @click="onNewSession">+</ui-button>
    </div>
    <ui-scroll-area class="flex-1 overflow-hidden">
      <ul>
        <SessionsItem
          v-for="session of list"
          :key="String(session.id)"
          :session="session"
        />
      </ul>
    </ui-scroll-area>
  </div>
</template>

<script setup lang="ts">
import type { ClassValue } from 'clsx';

import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
}>();

const list = useLiveQuery(() => db.sessions.reverse().toArray());

async function onNewSession() {
  const sessionId = await db.sessions.add({
    name: `new session ${(list.value?.length ?? 0) + 1}`,
  });

  navigateTo(`/chat/${sessionId}`);
}
</script>
