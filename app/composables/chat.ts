import type { LanguageModelV1 } from '@ai-sdk/provider';
import { useChat as useChatImpl } from '@ai-sdk/vue';
import { streamText } from 'ai';

export function useChat(model: MaybeRefOrGetter<LanguageModelV1>) {
  const customFetch: typeof fetch = async (url, options) => {
    console.log('customFetch', url, options, toValue(model));
    const body = options?.body ? JSON.parse(options.body as string) : {};

    const result = streamText({
      model: toValue(model),
      messages: body.messages,
      abortSignal: options?.signal ?? undefined,
    });

    return result.toDataStreamResponse();
  };

  return useChatImpl({
    fetch: customFetch,
  });
}
