import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, type, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { BookEntity } from './books.component';
import { BookDataService } from './services/book-data.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';

export const BookStore = signalStore(
  withDevtools('book-store'),
  withEntities({ collection: '_books', entity: type<BookEntity>() }),
  withMethods((store) => {
    // injection context
    const service = inject(BookDataService);
    return {
      load: rxMethod<void>(
        pipe(
          //tap(() => patchState(store, setPending())),
          switchMap(() =>
            // I only care about the last result. Throw any previous pending results away.
            service
              .getBooks()
              .pipe(
                tap((d) =>
                  patchState(store, setEntities(d, { collection: '_books' })),
                ),
              ),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      entities: computed(() => {
        const serverBooks = store._booksEntities();
       
        return [...serverBooks];
      }),
    //   totalPeople: computed(() => store._serverPeopleEntities().length),
    //   hasPeople: computed(() => 1),
    //   totalLocal: computed(
    //     () => store._serverPeopleEntities().filter((s) => s.isLocal).length,
    //   ),

    //   totalRemote: computed(
    //     () =>
    //       store._serverPeopleEntities().filter((s) => s.isLocal === false)
    //         .length,
    //   ),
    //   totalPending: computed(() => store._tempPeopleIds().length),
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
