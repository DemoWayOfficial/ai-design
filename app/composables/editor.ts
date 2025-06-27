export function useEditorModel() {
  return shallowRef<import('monaco-editor').editor.ITextModel>();
}
