import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div data-testid="counter-feature-ui">
      <button
        (click)="store.decrement()"
        [disabled]="store.counterAtZero()"
        class="btn btn-primary"
      >
        -
      </button>

      <span data-testid="current">
        {{ store.current() }}
      </span>

      <button (click)="store.increment()" class="btn btn-primary">+</button>

      <div>
        <p>{{ store.fizzBuzz() }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
