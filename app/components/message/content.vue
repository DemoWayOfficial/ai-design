<template>
  <template v-if="token.type === 'space'" />
  <Primitive v-else :as="content.tag">
    <template v-if="content.children">
      {{ content.children }}
    </template>
  </Primitive>
</template>

<script setup lang="ts">
import type { Token } from 'marked';
import { Primitive } from 'reka-ui';

const props = defineProps<{
  token: Token;
}>();

const content = computed(() => {
  const { token } = props;

  switch (token.type) {
    case 'heading':
      return {
        tag: `h${token.depth}`,
        children: token.text,
      };
    case 'br':
      return {
        tag: 'br',
      };
    case 'paragraph':
      return {
        tag: 'p',
        children: token.text,
      };
    default: {
      return {
        tag: 'div',
        children: token.raw,
      };
    }
  }
});
</script>
