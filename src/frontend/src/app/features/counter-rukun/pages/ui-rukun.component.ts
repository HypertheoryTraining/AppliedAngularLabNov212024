import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterRukunStore } from '../service/counter-rukun.store';

@Component({
  selector: 'app-counter-ui-rukun',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div data-testid="counter-feature-ui">
      <button
        (click)="storeRukun.decrement()"
        class="btn btn-primary"
        [disabled]="storeRukun.decrementDisabled()"
      >
        -
      </button>
      <span data-testid="current">{{ storeRukun.counter() }}</span>
      <button (click)="storeRukun.increment()" class="btn btn-primary">
        +
      </button>
      <button (click)="storeRukun.reset()" class="btn btn-primary">
        Reset
      </button>

      <div>
        <span>{{ storeRukun.fizzBuzz() }}</span>
      </div>
    </div>
  `,
  styles: ``,
})
export class UiRukunComponent {
  storeRukun = inject(CounterRukunStore);
}
