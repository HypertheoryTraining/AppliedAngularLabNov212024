import {
  ChangeDetectionStrategy,
  Component,
  computed,
  resource,
  signal,
} from '@angular/core';
import { BookEntity } from '../books.component';

type BookListColumn = 'id' | 'title' | 'author' | 'year';
type SortDirection = 'asc' | 'desc' | 'none';

type SortByOption = {
  column: BookListColumn;
  direction: SortDirection;
};

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th (click)="setSortBy('id')">Id</th>
          <th (click)="setSortBy('title')">Title</th>
          <th (click)="setSortBy('author')">Author</th>
          <th (click)="setSortBy('year')">Year</th>
        </tr>
      </thead>
      <tbody>
        @for (book of this.sortedBooks(); track book.id) {
          <tr>
            <th>{{ book.id }}</th>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class BooksListComponent {
  sortedBooks = computed(() => {
    const books = [...(this.booksResource.value() ?? [])];
    const { column, direction } = this.sortBy();

    if (this.sortBy().direction === 'none') {
      return books;
    }

    return books.sort((b1, b2) => {
      const directionFactor = direction == 'asc' ? 1 : -1;
      switch (column) {
        case 'id':
        case 'year':
          return (
            ((b1[column] as number) - (b2[column] as number)) * directionFactor
          );
        case 'title':
        case 'author':
          return (
            (b1[column] as string).localeCompare(b2[column] as string) *
            directionFactor
          );
      }
    });
  });

  sortBy = signal<SortByOption>({ column: 'id', direction: 'none' });

  getNextDirection(current: SortDirection): SortDirection {
    switch (current) {
      case 'asc':
        return 'desc';
      case 'desc':
        return 'none';
      case 'none':
        return 'asc';
    }
  }

  setSortBy(column: BookListColumn) {
    const changingColumns = column != this.sortBy().column;
    if (changingColumns) {
      this.sortBy.set({ column, direction: 'asc' });
    } else {
      const direction = this.getNextDirection(this.sortBy().direction);
      this.sortBy.set({ column, direction });
    }
  }

  booksResource = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}
