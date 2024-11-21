import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p data-testid="fizzBuzz">{{ fizzBuzz() }}</p>
      <button
        class="btn btn-primary"
        (click)="store.decrement()"
        (click)="isFizzBuzz()"
        [disabled]="store.decrementDisabled()"
      >
        -
      </button>
      <span data-testid="current">{{ store.current() }}</span>
      <button
        class="btn btn-primary"
        (click)="store.increment()"
        (click)="isFizzBuzz()"
      >
        +
      </button>
    </div>
  `,
  styles: [],
})
export class UiComponent {
  store = inject(CounterStore);
  counter = signal(0);
  fizzBuzz = signal('');

  isDecrementDisabled = computed(() => this.counter() <= 0);

  increaseIncrement() {
    this.counter.update((value) => value + 1);
  }

  decreaseIncrement() {
    if (this.counter() > 0) {
      this.counter.update((value) => value - 1);
    }
  }

  isFizzBuzz() {
    if (this.counter() % 5 === 0 && this.counter() % 3 === 0) {
      this.fizzBuzz.update(() => 'fizzBuzz');
    } else if (this.counter() % 3 === 0) {
      this.fizzBuzz.update(() => 'fizz');
    } else if (this.counter() % 5 === 0) {
      this.fizzBuzz.update(() => 'buzz');
    }
  }
}
