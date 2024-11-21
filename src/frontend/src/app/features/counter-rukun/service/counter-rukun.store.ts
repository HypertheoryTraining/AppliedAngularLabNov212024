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
import { COUNT_BY_VALUES, CountBy } from '../types-rukun';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type CounterRukunState = {
  counter: number;
  by: CountBy;
  byOptions: typeof COUNT_BY_VALUES;
};

type SavedCounterRukunState = Omit<CounterRukunState, 'byOptions'>;
const initialState: CounterRukunState = {
  counter: 0,
  by: 1,
  byOptions: COUNT_BY_VALUES,
};
export const CounterRukunStore = signalStore(
  withDevtools('counterRukun'),
  withState<CounterRukunState>(initialState),
  withMethods((store) => {
    return {
      setBy: (by: CountBy) => patchState(store, { by }),
      increment: () =>
        patchState(store, { counter: store.counter() + store.by() }),
      decrement: () =>
        patchState(store, { counter: store.counter() - store.by() }),
      reset: () => patchState(store, initialState),
    };
  }),
  withComputed((store) => {
    return {
      decrementDisabled: computed(() => store.counter() - store.by() < 0),
      fizzBuzz: computed(() => {
        const counter = store.counter();
        if (counter === 0) {
          return '';
        }
        if (store.counter() % 15 === 0) {
          return 'FizzBuzz';
        }
        if (store.counter() % 3 === 0) {
          return 'Fizz';
        }
        if (store.counter() % 5 === 0) {
          return 'Buzz';
        }
        return '';
      }),
    };
  }),
  withHooks({
    onInit(store) {
      const saved = localStorage.getItem('counter');
      if (saved != null) {
        const state = JSON.parse(saved) as unknown as SavedCounterRukunState;
        patchState(store, { counter: state.counter, by: state.by });
      }
      watchState(store, (state) => {
        const saveState: SavedCounterRukunState = {
          by: state.by,
          counter: state.counter,
        };
        localStorage.setItem('counter', JSON.stringify(saveState));
      });
    },
  }),
);
