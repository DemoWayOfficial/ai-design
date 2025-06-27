<template>
  <ui-drawer direction="left">
    <ui-drawer-trigger>
      <AlignJustify />
    </ui-drawer-trigger>
    <ui-drawer-content>
      <div>
        <ui-button @click="onNewSession"></ui-button>
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
    </ui-drawer-content>
  </ui-drawer>
</template>

<script setup lang="ts">
import { AlignJustify } from 'lucide-vue-next';

const list = useLiveQuery(() => db.sessions.reverse().toArray());

async function onNewSession() {
  const sessionId = await db.sessions.add({
    name: `new session ${(list.value?.length ?? 0) + 1}`,
  });

  navigateTo(`/chat/${sessionId}`);
}
</script>
