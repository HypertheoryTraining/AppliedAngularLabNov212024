import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Counter Preferences</p>
    <div class="join">
      @for (val of store.countByValues(); track val) {
        <button
          (click)="store.setCountBy(val)"
          [disabled]="store.countBy() === val"
          class="btn join-item"
        >
          {{ val }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
