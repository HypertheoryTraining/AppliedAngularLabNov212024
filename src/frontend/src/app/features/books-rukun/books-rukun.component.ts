import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookEntity } from './types-rukun';

// type BookApiResponse = {
//   data: BookEntity[];
// };

@Component({
  selector: 'app-books-rukun',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <!-- <pre>{{ books.value() | json }}</pre>  -->
    <div class="flex gap-8">
      <a class="btn btn-sm btn-primary" routerLink="list-rukun">List</a>
      <a class="btn btn-sm btn-primary" routerLink="stats-rukun">Stats</a>
      <a class="btn btn-sm btn-primary" routerLink="prefs-rukun">Prefs</a>
    </div>
    <div class="p-12">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class BooksRukunComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}
