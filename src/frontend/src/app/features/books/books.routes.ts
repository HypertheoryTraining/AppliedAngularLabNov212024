import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { ListComponent } from './list.component';
import { StatsComponent } from './stats.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' }, 
      { path: 'list', component: ListComponent },
      { path: 'stats', component: StatsComponent }
    ]
  }
];