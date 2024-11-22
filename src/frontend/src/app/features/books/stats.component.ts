import { JsonPipe, CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, resource, computed } from "@angular/core";

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
  selector: 'app-book-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, JsonPipe],
  template: `
    <div>
      <p>Total Books: {{ totalBooks() }}</p>
      <p>Earliest Year: {{ earliestYear() }}</p>
      <p>Latest Year: {{ latestYear() }}</p>
      <p>Average Pages: {{ averagePages() }}</p>
    </div>
  `,
  styles: [],
})
export class StatsComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  totalBooks = computed(() => {
    const books = this.books.value();
    return books ? books.length : 0;
  });

  earliestYear = computed(() => {
    const books = this.books.value();
    if (books && books.length > 0) {
      return Math.min(...books.map(book => book.year));
    }
    return 'N/A';
  });

  latestYear = computed(() => {
    const books = this.books.value();
    if (books && books.length > 0) {
      return Math.max(...books.map(book => book.year));
    }
    return 'N/A';
  });

  averagePages = computed(() => {
    const books = this.books.value();
    if (books && books.length > 0) {
      const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
      return (totalPages / books.length).toFixed(2); 
    }
    return 0;
  });
}