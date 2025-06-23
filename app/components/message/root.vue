<template>
  <div
    :class="
      cn(
        messageVariants({
          role: message.role,
        }),
      )
    "
  >
    {{ message.content }}
  </div>
</template>

<script setup lang="ts">
import type { UIMessage } from '@ai-sdk/vue';

import { messageVariants } from '~/components/message/variants';
import { cn } from '~/lib/utils';

defineProps<{
  message: UIMessage;
}>();
</script>
