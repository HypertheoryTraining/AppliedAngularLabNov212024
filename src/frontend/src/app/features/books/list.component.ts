import { JsonPipe, CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, resource, signal, computed } from "@angular/core";

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
  selector: 'app-book-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, JsonPipe],
  template: `
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th (click)="sort('id')">ID</th>
            <th (click)="sort('title')">Title</th>
            <th (click)="sort('author')">Author</th>
            <th (click)="sort('year')">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of sortedBooks()">
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class ListComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  sortColumn = signal<'id' | 'title' | 'author' | 'year'>('title');
  sortOrder = signal<'asc' | 'desc'>('asc');

  sortedBooks = computed(() => {
    const books = this.books.value() || [];
    const column = this.sortColumn();
    const order = this.sortOrder();

    return books.slice().sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  });

  sort(column: 'id' | 'title' | 'author' | 'year') {
    if (this.sortColumn() === column) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortOrder.set('asc');
    }
  }
}