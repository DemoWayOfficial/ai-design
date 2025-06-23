import type { Message } from '@ai-sdk/vue';
import { useObservable } from '@vueuse/rxjs';
import Dexie, { type EntityTable, liveQuery } from 'dexie';
import { from } from 'rxjs';

export interface DBMessage extends Message {
  dbId: number;
}

const db = new Dexie('Chat') as Dexie & {
  messages: EntityTable<
    DBMessage,
    'dbId' // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  messages: '++dbId,&id,sessionId',
});

export { db };

export function useLiveQuery<T>(querier: () => T | Promise<T>) {
  return useObservable<T>(from(liveQuery(querier)));
}
