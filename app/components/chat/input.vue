<template>
  <div :class="cn('flex gap-2', props.class)">
    <ui-input v-model="input" class="flex-1" />
    <ui-button class="flex-none" @click="emit('submit', $event)">
      submit
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import type { ClassValue } from 'clsx';

import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
}>();

const emit = defineEmits<{
  submit: [MouseEvent];
}>();

const input = defineModel<string>();
</script>
