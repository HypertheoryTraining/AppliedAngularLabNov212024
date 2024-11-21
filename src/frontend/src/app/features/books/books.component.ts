import { JsonPipe, CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

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
  imports: [CommonModule, JsonPipe],
  template: `
    <h2>Books List</h2>
    <ul>
      <li *ngFor="let book of books.value()">
        <strong>{{ book.title }}</strong> by {{ book.author }}
      </li>
    </ul>
    <pre>{{ books.value() | json }}</pre>
  `,
  styles: [],
})
export class BooksComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}