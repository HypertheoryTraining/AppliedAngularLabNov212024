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
import { COUNT_BY_VALUES, CountBy } from '../type-lab';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
type CounterState = {
  current: number;
  by: CountBy;
  byOptions: typeof COUNT_BY_VALUES;
};

type SavedCounterState = Omit<CounterState, 'byOptions'>;
const initialState: CounterState = {
  current: 0,
  // by: 2,
  by: 1,
  byOptions: COUNT_BY_VALUES,
};
export const CounterStore = signalStore(
  withDevtools('counter'),
  withState<CounterState>(initialState),
  withMethods((store) => {
    return {
      setBy: (by: CountBy) => patchState(store, { by }),
      increment: () =>
        patchState(store, { current: store.current() + store.by() }),
      decrement: () =>
        patchState(store, { current: store.current() - store.by() }),
      reset: () => patchState(store, initialState),
    };
  }),
  withComputed((store) => {
    return {
      decrementDisabled: computed(() => store.current() - store.by() < 0),
      fizzBuzz: computed(() => {
        const current = store.current();
        if (current === 0) {
          return '';
        }
        if (isFizzBuzz(current)) {
          // get this result on numebr 21 if you want to see a FizzBuzz
          return `${current} is FizzBuzz / Divided by 3 and 7 both`;
        }
        if (isFizz(current)) {
          return `${current} is Fizz / Divided by 3`;
        }
        if (isBuzz(current)) {
          return `${current} is Buzz / Divided by 7`;
        }
        // if (isPrime(current)) {
        //   return `${current} is prime numebr`;
        // }
        // if (isFizzBuzzPrime(current)) {
        //   return `${current} abc`;
        // }
        return '';
      }),
    };
  }),
  withHooks({
    onInit(store) {
      const saved = localStorage.getItem('counter');
      if (saved != null) {
        const state = JSON.parse(saved) as unknown as SavedCounterState;
        patchState(store, { current: state.current, by: state.by });
      }
      watchState(store, (state) => {
        const saveState: SavedCounterState = {
          by: state.by,
          current: state.current,
        };
        localStorage.setItem('counter', JSON.stringify(saveState));
      });
    },
  }),
);

function isFizz(n: number) {
  return n % 3 === 0;
}
function isBuzz(n: number) {
  return n % 7 === 0;
}

function isFizzBuzz(n: number) {
  return isFizz(n) && isBuzz(n);
}
// function isFizzBuzzPrime(n: number): string {
//   let result = '';

//   // Check for FizzBuzz
//   if (n % 3 === 0) {
//     result += 'Fizz';
//   }
//   if (n % 5 === 0) {
//     result += 'Buzz';
//   }

//   // Check for Prime
//   if (isPrime(n)) {
//     result += 'Prime';
//   }

//   return result || n.toString();
// }

// function isPrime(num: number): boolean {
//   if (num <= 1) {
//     return false;
//   }

//   for (let i = 2; i <= Math.sqrt(num); i++) {
//     if (num % i === 0) {
//       return false;
//     }
//   }

//   return true;
// }
