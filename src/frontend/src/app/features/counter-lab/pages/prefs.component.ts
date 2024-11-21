import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-lab-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    @for (var_A of store.byOptions(); track var_A) {
      <button
        (click)="store.setBy(var_A)"
        [disabled]="store.by() === var_A"
        class="btn join-item"
      >
        {{ var_A }}
      </button>
    }
  </div>`,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
