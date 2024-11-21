import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ current: 0 }),
  withMethods((store) => {
    return {
      increment: () => patchState(store, { current: store.current() + 1 }),
      decrement: () => patchState(store, { current: store.current() - 1 }),
    };
  }),
  withComputed((store) => {
    return {
      decrementDisabled: computed(() => store.current() === 0),
      fizzBuzz: computed(() => {
        const current = store.current();
        if (current === 0) return '';
        if (current % 3 === 0 && current % 5 === 0) return 'fizzBuzz';
        if (current % 3 === 0) return 'fizz';
        if (current % 5 === 0) return 'buzz';
        return '';
      }),
    };
  }),
);
