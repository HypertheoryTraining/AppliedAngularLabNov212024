import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import {
  BookEntity,
  BookListColumn,
  SortByOption,
  SortDirection,
} from '../types';
import { BooksService } from './books.service';

export const BooksStore = signalStore(
  withEntities<BookEntity>(),
  withState<SortByOption>({ column: 'id', direction: 'asc' }),
  withMethods((store) => {
    const service = inject(BooksService);

    return {
      load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service
              .getBooks()
              .pipe(tap((books) => patchState(store, setEntities(books)))),
          ),
        ),
      ),

      setSortByOption: (sortBy: SortByOption) => {
        patchState(store, sortBy);
      },

      setSortByColumn: (column: BookListColumn) => {
        patchState(store, { column });
      },

      setSortByDirection: (direction: SortDirection) => {
        patchState(store, { direction });
      },

      toggleSort: (column: BookListColumn) => {
        const changingColumns = column != store.column();
        if (changingColumns) {
          patchState(store, { column, direction: 'asc' });
        } else {
          const direction = getNextDirection(store.direction());
          patchState(store, { column, direction });
        }
      },
    };
  }),

  withComputed((store) => {
    return {
      sortedBooks: computed(() => {
        const books = [...store.entities()];
        const column = store.column();
        const direction = store.direction();

        if (direction === 'none') {
          return books;
        }

        return books.sort((b1, b2) => {
          const directionFactor = direction == 'asc' ? 1 : -1;
          switch (column) {
            case 'id':
            case 'year':
              return (
                ((b1[column] as number) - (b2[column] as number)) *
                directionFactor
              );
            case 'title':
            case 'author':
              return (
                (b1[column] as string).localeCompare(b2[column] as string) *
                directionFactor
              );
          }
        });
      }),

      totalBooks: computed(() => store.entities().length),

      earliestBookYear: computed(() =>
        store
          .entities()
          .map((b) => b.year)
          .reduce((prev, curr) => (prev < curr ? prev : curr)),
      ),

      mostRecentBookYear: computed(() =>
        store
          .entities()
          .map((b) => b.year)
          .reduce((prev, curr) => (prev > curr ? prev : curr)),
      ),

      avgPages: computed(() => {
        const totalPages =
          store
            .entities()
            .map((b) => b.pages)
            .reduce((a, b) => a + b) ?? 0;
        const totalBooks = store.entities().length;
        if (totalBooks == 0) {
          return 0;
        }

        return totalPages / totalBooks;
      }),
    };
  }),

  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);

function getNextDirection(current: SortDirection): SortDirection {
  switch (current) {
    case 'asc':
      return 'desc';
    case 'desc':
      return 'none';
    case 'none':
      return 'asc';
  }
}
