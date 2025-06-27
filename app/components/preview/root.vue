<template>
  <div
    class="bg-background flex flex-1 flex-col overflow-hidden rounded-xl border shadow"
  >
    <div
      class="flex h-[40px] w-full flex-none items-center gap-1 border-b px-1"
    >
      <ui-button
        v-for="preview of previews"
        :key="preview.id"
        :variant="active === preview.id ? 'default' : 'secondary'"
        size="sm"
        class="h-7"
        @click="active = preview.id"
      >
        {{ `${preview.id}.${preview.lang}` }}
      </ui-button>

      <ui-tabs
        v-if="activePreview?.lang === 'html'"
        v-model="mode"
        class="ml-auto"
      >
        <ui-tabs-list>
          <ui-tabs-trigger value="preview">preview</ui-tabs-trigger>
          <ui-tabs-trigger value="code">code</ui-tabs-trigger>
        </ui-tabs-list>
      </ui-tabs>
    </div>

    <div class="flex-1">
      <PreviewView
        v-if="activePreview"
        :key="activePreview.id"
        :preview="activePreview"
        :mode="viewMode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Preview } from '~/components/preview/types';

const props = defineProps<{
  previews: Preview[];
}>();

const active = defineModel<string>('active');

const activePreview = computed(() => {
  const { previews } = props;
  if (!active.value) {
    return undefined;
  }
  return previews.find((item) => item.id === active.value);
});

const mode = ref<'code' | 'preview'>('preview');

const viewMode = computed(() => {
  if (activePreview.value?.lang !== 'html') {
    return 'code';
  }
  return mode.value;
});
</script>
