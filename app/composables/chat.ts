import type { LanguageModelV1 } from '@ai-sdk/provider';
import type { UseChatOptions } from '@ai-sdk/ui-utils';
import { type Message, useChat as useChatImpl } from '@ai-sdk/vue';
import { streamText } from 'ai';

import { db } from '~/composables/dexie';

export interface UseChatParams {
  model: MaybeRefOrGetter<LanguageModelV1>;
  sessionId: MaybeRefOrGetter<string>;
  onFinish?: UseChatOptions['onFinish'];
  onRestore?(messages: Message[]): void;
}

export function useChat(params: UseChatParams) {
  const customFetch: typeof fetch = async (url, options) => {
    const body = options?.body ? JSON.parse(options.body as string) : {};

    const result = streamText({
      model: toValue(params.model),
      messages: body.messages,
      abortSignal: options?.signal ?? undefined,
    });

    return result.toDataStreamResponse();
  };

  const chat = useChatImpl({
    fetch: customFetch,
    onFinish(...args) {
      persistMessages();
      params.onFinish?.(...args);
    },
  });

  function handleSubmit(event?: { preventDefault?: () => void }) {
    chat.handleSubmit(event);

    persistMessages();
  }

  function persistMessages() {
    const sessionId = toValue(params.sessionId);
    const messages = chat.messages.value;
    db.messages.bulkPut(
      messages.map((message) => ({
        ...message,
        dbId: undefined,
        sessionId,
      })),
    );
  }

  onMounted(() => {
    db.messages
      .where('sessionId')
      .equals(toValue(params.sessionId))
      .toArray()
      .then((messages) => {
        chat.setMessages(messages);
        params.onRestore?.(messages);
      });
  });

  return {
    ...chat,
    handleSubmit,
  };
}
