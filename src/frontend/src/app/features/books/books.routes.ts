import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { canMatchFeature } from '../../shared';
import { BooksListComponent } from './pages/list.component';
import { BooksStatsComponent } from './pages/stats.component';
import { BooksPrefsComponent } from './pages/prefs.component';
import { BooksStore } from './services/books.store';
import { BooksService } from './services/books.service';
import { BooksDetailsComponent } from './pages/details.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    canMatch: [canMatchFeature('books')],
    component: BooksComponent,
    providers: [BooksStore, BooksService],
    children: [
      {
        path: 'list',
        component: BooksListComponent,
      },
      {
        path: 'stats',
        component: BooksStatsComponent,
      },
      {
        path: 'prefs',
        component: BooksPrefsComponent,
      },
      {
        path: 'details/:id',
        component: BooksDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
