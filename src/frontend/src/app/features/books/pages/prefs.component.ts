import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-books-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
  template: ` <h3>Sort column:</h3>
    <div class="join">
      @for (column of store.columns(); track column) {
        <button
          [disabled]="store.sortBy().column === column"
          (click)="store.setSortByColumn(column)"
          class="btn join-item"
        >
          {{ column | titlecase }}
        </button>
      }
    </div>
    <h3>Sort direction</h3>
    <div class="join">
      @for (direction of store.sortDirections(); track direction) {
        <button
          [disabled]="store.sortBy().direction === direction"
          (click)="store.setSortByDirection(direction)"
          class="btn join-item"
        >
          {{ direction | titlecase }}
        </button>
      }
    </div>`,
  styles: ``,
})
export class BooksPrefsComponent {
  store = inject(BooksStore);
}
