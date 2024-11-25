import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookEntity } from '../books.component';


export type ApiResult = {
  data: BookEntity[];
};
// export type PersonItem = {
//   id: string;
//   name: string;
//   isLocal: boolean;
// };

@Injectable()
export class BookDataService {
  #http = inject(HttpClient);

  getBooks(): Observable<BookEntity[]> {
    return this.#http.get<ApiResult>('/api/books').pipe(
      map((r) => r.data), // ApiResult -> {id: string, name: string, isLocal: boolean}[]
    );
  }
}