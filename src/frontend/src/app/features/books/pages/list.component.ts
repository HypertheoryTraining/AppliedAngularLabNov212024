import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th (click)="store.toggleSort('id')">Id</th>
          <th (click)="store.toggleSort('title')">Title</th>
          <th (click)="store.toggleSort('author')">Author</th>
          <th (click)="store.toggleSort('year')">Year</th>
        </tr>
      </thead>
      <tbody>
        @for (book of store.sortedBooks(); track book.id) {
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
  store = inject(BooksStore);
}
