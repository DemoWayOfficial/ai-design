import { useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';

export function useLiveQuery<T>(querier: () => T | Promise<T>) {
  return useObservable<T>(from(liveQuery(querier)));
}
