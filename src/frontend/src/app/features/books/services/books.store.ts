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
  BOOK_LIST_COLUMNS,
  BookEntity,
  BookListColumn,
  SORT_DIRECTIONS,
  SortByOption,
  SortDirection,
} from '../types';
import { BooksService } from './books.service';

export const BooksStore = signalStore(
  withEntities<BookEntity>(),
  withState<{
    columns: typeof BOOK_LIST_COLUMNS;
    sortDirections: typeof SORT_DIRECTIONS;
    sortBy: SortByOption;
    selectedBookId: string;
  }>({
    columns: BOOK_LIST_COLUMNS,
    sortDirections: SORT_DIRECTIONS,
    sortBy: { column: 'id', direction: 'ascending' },
    selectedBookId: '1',
  }),
  withMethods((store) => {
    const service = inject(BooksService);

    return {
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service
              .getBooks()
              .pipe(tap((books) => patchState(store, setEntities(books)))),
          ),
        ),
      ),

      setSelectedBookId: (id: string) => {
        patchState(store, { selectedBookId: id });
      },

      setSortByColumn: (column: BookListColumn) => {
        patchState(store, {
          sortBy: { column, direction: store.sortBy().direction },
        });
        saveToLocalStorage(store.sortBy());
      },

      setSortByDirection: (direction: SortDirection) => {
        patchState(store, {
          sortBy: { column: store.sortBy().column, direction },
        });
        saveToLocalStorage(store.sortBy());
      },

      toggleSort: (column: BookListColumn) => {
        const changingColumns = column != store.sortBy().column;
        if (changingColumns) {
          patchState(store, { sortBy: { column, direction: 'ascending' } });
          saveToLocalStorage(store.sortBy());
        } else {
          const direction = getNextDirection(store.sortBy().direction);
          patchState(store, { sortBy: { column, direction } });
          saveToLocalStorage(store.sortBy());
        }
      },
    };
  }),

  withComputed((store) => {
    return {
      sortedBooks: computed(() => {
        const books = [...store.entities()];
        const { column, direction } = store.sortBy();

        if (direction === 'none') {
          return books;
        }

        return books.sort((b1, b2) => {
          const directionFactor = direction == 'ascending' ? 1 : -1;
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

      selectedBook: computed(() => {
        const filteredBooks = store
          .entities()
          .filter((b) => b.id === store.selectedBookId());

        if (filteredBooks) {
          return filteredBooks[0];
        }

        return null;
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
      store._load();

      const savedPrefsStr = localStorage.getItem('books-prefs');
      if (savedPrefsStr) {
        const savedPrefs: SortByOption = JSON.parse(savedPrefsStr);
        patchState(store, { sortBy: savedPrefs });
      } else {
        saveToLocalStorage(store.sortBy());
      }
    },
  }),
);

function getNextDirection(current: SortDirection): SortDirection {
  switch (current) {
    case 'ascending':
      return 'descending';
    case 'descending':
      return 'none';
    case 'none':
      return 'ascending';
  }
}

function saveToLocalStorage(sortBy: SortByOption) {
  localStorage.setItem('books-prefs', JSON.stringify(sortBy));
}
