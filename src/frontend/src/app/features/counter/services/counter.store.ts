import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const COUNT_BY_VALUES = [1, 3, 5] as const;
type CountBy = (typeof COUNT_BY_VALUES)[number];
type CounterState = {
  current: number;
  countBy: CountBy;
  countByValues: typeof COUNT_BY_VALUES;
};

type CounterPersistenceState = Omit<CounterState, 'countByValues'>;

export const CounterStore = signalStore(
  withState<CounterState>({
    current: 0,
    countBy: 1,
    countByValues: COUNT_BY_VALUES,
  }),
  withMethods((store) => {
    return {
      setCountBy: (countBy: CountBy) => patchState(store, { countBy }),
      increment: () =>
        patchState(store, { current: store.current() + store.countBy() }),
      decrement: () =>
        patchState(store, { current: store.current() - store.countBy() }),
    };
  }),
  withComputed((store) => {
    return {
      counterAtZero: computed(() => store.current() - store.countBy() < 0),
      fizzBuzz: computed(() => {
        const current = store.current();
        let text = '';
        if (current != 0) {
          if (current % 3 === 0) text += 'Fizz';
          if (current % 5 === 0) text += 'Buzz';
        }
        return text;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      const savedState = localStorage.getItem('counter');
      if (savedState) {
        const persistenceState = JSON.parse(
          savedState,
        ) as CounterPersistenceState;
        patchState(store, persistenceState);
      }

      watchState(store, (state) => {
        const persistenceState: CounterPersistenceState = {
          current: state.current,
          countBy: state.countBy,
        };
        localStorage.setItem('counter', JSON.stringify(persistenceState));
      });
    },
  }),
);
