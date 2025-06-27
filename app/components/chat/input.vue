<template>
  <div :class="cn('flex h-32 flex-col rounded-xl border p-2', props.class)">
    <ui-textarea v-model="input" class="flex-1" />
    <div class="flex h-8 items-center">
      <ui-button class="flex-none" @click="emit('submit', $event)">
        submit
      </ui-button>
    </div>
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
