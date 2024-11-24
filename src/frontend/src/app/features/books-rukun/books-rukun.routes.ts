import { Routes } from '@angular/router';
import { BooksRukunComponent } from './books-rukun.component';
import { ListRukunComponent } from './pages/list-rukun.component';
import { DetailsRukunComponent } from './pages/details-rukun.component';
import { BookRukunStore } from './services/books-rukun.store';
import { BooksRukunDataService } from './services/books-rukun-data.service';
import { StatsRukunComponent } from './pages/stats-rukun.component';
import { PrefsRukunComponent } from './pages/prefs-rukun.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksRukunComponent,
    providers: [BookRukunStore, BooksRukunDataService],
    children: [
      {
        path: 'list-rukun',
        component: ListRukunComponent,
      },
      {
        path: 'stats-rukun',
        component: StatsRukunComponent,
      },
      {
        path: 'prefs-rukun',
        component: PrefsRukunComponent,
      },
      {
        path: 'details-rukun/:id',
        component: DetailsRukunComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
