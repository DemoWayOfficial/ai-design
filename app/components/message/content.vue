<template>
  <template v-if="token.type === 'space'" />
  <br v-else-if="token.type === 'br'" />
  <p v-else-if="token.type === 'p'">
    <template v-if="token.tokens">
      <MessageContent
        v-for="(child, index) of token.tokens"
        :key="index"
        v-memo="child.raw"
        :token="child"
      />
    </template>
    <template v-else>
      {{ token.raw }}
    </template>
  </p>
  <component :is="`h${token.depth}`" v-else-if="token.type === 'heading'">
    <MessageContent
      v-for="(child, index) of token.tokens"
      :key="index"
      v-memo="child.raw"
      :token="child"
    />
  </component>
  <template v-else-if="token.type === 'text'">
    <template v-if="token.tokens">
      <MessageContent
        v-for="(child, index) of token.tokens"
        :key="index"
        v-memo="child.raw"
        :token="child"
      />
    </template>
    <template v-else>
      {{ token.raw }}
    </template>
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
