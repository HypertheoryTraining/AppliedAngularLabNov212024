import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';
import { BookEntity } from '../books.component';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (this.books.hasValue()) {
      <p>Total number of books: {{ totalBooks() }}</p>
      <p>Earliest published book year: {{ earliestBookYear() }}</p>
      <p>Most recently published book year: {{ mostRecentBookYear() }}</p>
      <p>Average number of pages: {{ avgPages() }}</p>
    } @else {
      <p>Loading book data...</p>
    }
  `,
  styles: ``,
})
export class BooksStatsComponent {
  totalBooks = computed(() => this.books.value()?.length ?? 0);
  earliestBookYear = computed(() =>
    this.books
      .value()
      ?.map((b) => b.year)
      .reduce((prev, curr) => (prev < curr ? prev : curr)),
  );
  mostRecentBookYear = computed(() =>
    this.books
      .value()
      ?.map((b) => b.year)
      .reduce((prev, curr) => (prev > curr ? prev : curr)),
  );
  avgPages = computed(() => {
    const totalPages =
      this.books
        .value()
        ?.map((b) => b.pages)
        .reduce((a, b) => a + b) ?? 0;
    const totalBooks = this.books.value()?.length ?? 1;

    return totalPages / totalBooks;
  });

  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}
