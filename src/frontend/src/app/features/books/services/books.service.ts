import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookEntity } from '../types';

@Injectable()
export class BooksService {
  #http = inject(HttpClient);

  getBooks(): Observable<BookEntity[]> {
    return this.#http
      .get<{ data: BookEntity[] }>('/api/books')
      .pipe(map((r) => r.data));
  }
}
