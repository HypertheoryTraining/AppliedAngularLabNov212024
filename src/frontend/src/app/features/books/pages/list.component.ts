import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';
import { TitleCasePipe } from '@angular/common';
import { SortIconPipe } from '../pipes/sort-icon.pipe';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe, SortIconPipe],
  template: `<div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          @for (column of store.columns(); track column) {
            @if (store.sortBy().column === column) {
              <th>
                <button (click)="store.toggleSort(column)" class="btn">
                  {{ column | titlecase }}
                  {{ store.sortBy().direction | sorticon }}
                </button>
              </th>
            } @else {
              <th>
                <button (click)="store.toggleSort(column)" class="btn">
                  {{ column | titlecase }}
                </button>
              </th>
            }
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
