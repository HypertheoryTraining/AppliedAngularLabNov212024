import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p data-testid="fizzBuzz">{{ store.fizzBuzz() }}</p>
      <button
        class="btn btn-primary"
        (click)="store.decrement()"
        [disabled]="store.decrementDisabled()"
      >
        -
      </button>
      <span data-testid="current">{{ store.current() }}</span>
      <button class="btn btn-primary" (click)="store.increment()">+</button>
    </div>
  `,
  styles: [],
})
export class UiComponent {
  store = inject(CounterStore);
}
