import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterRukunStore } from '../service/counter-rukun.store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    @for (by of storeRukun.byOptions(); track by) {
      <button
        (click)="storeRukun.setBy(by)"
        [disabled]="storeRukun.by() === by"
        class="btn join-item"
      >
        {{ by }}
      </button>
    }
  </div>`,
  styles: ``,
})
export class PrefsRukunComponent {
  storeRukun = inject(CounterRukunStore);
}
