import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookRukunStore } from '../services/books-rukun.store';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div>
    <p>Number of Books {{ store.stats().numberOfBooks }}</p>
    <p>Earliest Book {{ store.stats().earliestBook }}</p>
    <p>Latest Book {{ store.stats().latestBook }}</p>
    <p>Average Pages {{ store.stats().averagePages }}</p>
  </div>`,
  styles: ``,
})
export class StatsRukunComponent {
  store = inject(BookRukunStore);
}
