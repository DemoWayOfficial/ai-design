<template>
  <template v-if="token.type === 'space'" />
  <br v-else-if="token.type === 'br'" />
  <p v-else-if="token.type === 'p'">
    <MessageRendererChildren :tokens="token.tokens" :raw="token.raw" />
  </p>
  <component :is="`h${token.depth}`" v-else-if="token.type === 'heading'">
    <MessageRendererChildren :tokens="token.tokens" :raw="token.raw" />
  </component>
  <template v-else-if="token.type === 'text'">
    <MessageRendererChildren :tokens="token.tokens" :raw="token.raw" />
  </template>
  <div v-else>
    {{ token.raw }}
  </div>
</template>

<script setup lang="ts">
// https://github.com/markedjs/marked/blob/master/src/Renderer.ts

import type { Token } from 'marked';

defineProps<{
  token: Token;
}>();
</script>
