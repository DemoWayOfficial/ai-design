<template>
  <iframe ref="iframeRef" sandbox="allow-same-origin allow-scripts" />
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string;
}>();

const iframeRef = ref<HTMLIFrameElement>();

onMounted(() => {
  watch(
    () => props.code,
    (code) => {
      const iframe = iframeRef.value;
      if (!iframe?.contentDocument) {
        return;
      }
      const doc = iframe.contentDocument;
      doc.open('text/html', 'replace');
      doc.writeln('<!DOCTYPE html>');
      doc.writeln(code);
      doc.close();
    },
    {
      immediate: true,
    },
  );
});
</script>
