import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  effect,
  signal,
} from '@angular/core';
import { BookRukunStore } from '../services/books-rukun.store';

import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-books-details-rukun',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    @if (store.isFulfilled()) {
      <p>Details Go Here for {{ id() }}</p>

      @if (!store.selectedBook()) {
        <p>No Book For You! Try again.</p>
      } @else {
        <pre>{{ store.selectedBook() | json }}</pre>
      }
    } @else {
      <p>stand by - getting your data, yo.</p>
    }
  `,
  styles: ``,
})
export class DetailsRukunComponent {
  // books/details/938983

  store = inject(BookRukunStore);
  id = input.required<string>();

  constructor() {
    effect(() => {
      if (this.store.isFulfilled()) {
        this.store.setSelectedBook(this.id()); // < 19 this wouldn't work.
      }
    });
  }
}
