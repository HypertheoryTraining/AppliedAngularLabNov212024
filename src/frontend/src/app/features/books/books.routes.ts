import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { ListComponent } from './pages/list.component';
import { StatsComponent } from './pages/stats.component';
import { BookStore } from './book.store';
import { BookDataService } from './services/book-data.service';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BookStore, BookDataService],
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      }]
  },
];
