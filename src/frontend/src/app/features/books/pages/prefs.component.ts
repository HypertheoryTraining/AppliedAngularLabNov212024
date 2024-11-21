import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-books-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <h3>Sort column:</h3>
    <div class="join">
      <button
        [disabled]="store.column() === 'id'"
        (click)="store.setSortByColumn('id')"
        class="btn join-item"
      >
        Id
      </button>
      <button
        [disabled]="store.column() === 'title'"
        (click)="store.setSortByColumn('title')"
        class="btn join-item"
      >
        Title
      </button>
      <button
        [disabled]="store.column() === 'author'"
        (click)="store.setSortByColumn('author')"
        class="btn join-item"
      >
        Author
      </button>
      <button
        [disabled]="store.column() === 'year'"
        (click)="store.setSortByColumn('year')"
        class="btn join-item"
      >
        Year
      </button>
    </div>
    <h3>Sort direction</h3>
    <button
      [disabled]="store.direction() === 'asc'"
      (click)="store.setSortByDirection('asc')"
      class="btn join-item"
    >
      Ascending
    </button>
    <button
      [disabled]="store.direction() === 'desc'"
      (click)="store.setSortByDirection('desc')"
      class="btn join-item"
    >
      Descending
    </button>
    <button
      [disabled]="store.direction() === 'none'"
      (click)="store.setSortByDirection('none')"
      class="btn join-item"
    >
      None
    </button>`,
  styles: ``,
})
export class BooksPrefsComponent {
  store = inject(BooksStore);
}
