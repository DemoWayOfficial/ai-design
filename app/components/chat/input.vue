<template>
  <form
    :class="cn('flex h-32 flex-col rounded-xl border px-1 pt-1', props.class)"
    @submit.prevent="emit('submit', $event)"
  >
    <ui-textarea v-model="input" class="flex-1 border-none p-0.5 shadow-none" />
    <div class="flex h-8 items-center">
      <Popover>
        <PopoverTrigger as-child>
          <ui-button class="h-5" variant="secondary" size="sm">
            select model
          </ui-button>
        </PopoverTrigger>
        <PopoverContent>select model</PopoverContent>
      </Popover>

      <ui-button class="ml-auto size-7 flex-none" size="icon" variant="ghost">
        <Send />
      </ui-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ClassValue } from 'clsx';
import { Send } from 'lucide-vue-next';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: ClassValue;
}>();

const emit = defineEmits<{
  submit: [Event];
}>();

const input = defineModel<string>();
</script>
