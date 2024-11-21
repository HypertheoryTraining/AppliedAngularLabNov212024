import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-books-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: ` @let book = this.store.selectedBook();
    @if (book) {
      <p>Id - {{ book.id }}</p>
      <p>Title - {{ book.title }}</p>
      <p>Author - {{ book.author }}</p>
      <p>Country - {{ book.country }}</p>
      <p>Language - {{ book.language }}</p>
      <p>Pages - {{ book.pages }}</p>
      <p>Year - {{ book.year }}</p>
      <a href="{{ book.link }}">Link to book</a>
      <img src="{{ book.imageLink }}" alt="Book image" />
    } @else {
      <p>The book could not be found.</p>
      <a routerLink="../../list">Go back to list</a>
    }`,
  styles: ``,
})
export class BooksDetailsComponent {
  store = inject(BooksStore);
  route = inject(ActivatedRoute);

  constructor() {
    this.store.setSelectedBookId(this.route.snapshot.params['id']);
  }
}
