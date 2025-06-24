<template>
  <template v-if="tokens">
    <MessageRenderer
      v-for="(child, index) of tokens"
      :key="index"
      v-memo="child.raw"
      :token="child"
    />
  </template>
  <template v-else>
    {{ raw }}
  </template>
</template>

<script setup lang="ts">
import type { Token } from 'marked';

defineProps<{
  tokens?: Token[];
  raw: string;
}>();
</script>
