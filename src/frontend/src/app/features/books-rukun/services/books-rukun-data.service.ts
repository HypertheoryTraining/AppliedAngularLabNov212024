import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookEntity } from '../types-rukun';
import { map } from 'rxjs';

@Injectable()
export class BooksRukunDataService {
  #client = inject(HttpClient);

  loadBooks() {
    return this.#client
      .get<{ data: BookEntity[] }>('/api/books')
      .pipe(map((r) => r.data));
  }
}
