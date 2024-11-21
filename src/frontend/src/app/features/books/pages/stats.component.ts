import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Total number of books: {{ store.totalBooks() }}</p>
    <p>Earliest published book year: {{ store.earliestBookYear() }}</p>
    <p>Most recently published book year: {{ store.mostRecentBookYear() }}</p>
    <p>Average number of pages: {{ store.avgPages() }}</p>
  `,
  styles: ``,
})
export class BooksStatsComponent {
  store = inject(BooksStore);
}
