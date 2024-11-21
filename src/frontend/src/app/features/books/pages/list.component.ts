import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
  template: `<div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          @for (column of store.columns(); track column) {
            <th (click)="store.toggleSort(column)">{{ column | titlecase }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (book of store.sortedBooks(); track book.id) {
          <tr>
            @for (column of store.columns(); track column) {
              <th>{{ book[column] }}</th>
            }
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
