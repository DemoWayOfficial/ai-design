<template>
  <div ref="container" />
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';

const props = defineProps<{
  defaultValue?: string;
  language?: string;
}>();

const container = ref<HTMLElement>();

const modelRef = defineModel<monaco.editor.ITextModel>();
const editorRef = defineModel<monaco.editor.IStandaloneCodeEditor>('editor');

onMounted(() => {
  if (!container.value) {
    return;
  }

  if (!modelRef.value) {
    modelRef.value = markRaw(
      monaco.editor.createModel(
        props.defaultValue ?? '',
        props.language ?? 'text',
      ),
    );
  }

  watch([() => props.language, modelRef], ([language, textModel]) => {
    if (!textModel) {
      return;
    }
    monaco.editor.setModelLanguage(textModel, language ?? 'text');
  });

  const editor = monaco.editor.create(container.value, {
    model: modelRef.value,
    readOnly: true,
    theme: 'vs-dark',
  });
  editorRef.value = markRaw(editor);
});

onUnmounted(() => {
  editorRef.value?.dispose();
});
</script>
