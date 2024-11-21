import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';
import { TitleCasePipe } from '@angular/common';
import { SortIconPipe } from '../pipes/sort-icon.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe, SortIconPipe, RouterLink],
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
              @if (column === 'title') {
                <th>
                  <a routerLink="../details/{{ book.id }}">{{
                    book[column]
                  }}</a>
                </th>
              } @else {
                <th>{{ book[column] }}</th>
              }
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
