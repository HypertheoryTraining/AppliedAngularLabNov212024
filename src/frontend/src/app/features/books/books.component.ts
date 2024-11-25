import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-8">
        <a class="link" routerLink="list">List</a>
        <a class="link" routerLink="stats">Stats</a>
    </div>
    <router-outlet/>
    <pre>{{ books.value() | json }}</pre>
  `,
  styles: ``,
})
export class BooksComponent {

  
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}
