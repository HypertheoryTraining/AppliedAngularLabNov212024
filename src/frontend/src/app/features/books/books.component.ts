import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: ` <div class="flex gap-8">
      <a class="link" routerLink="list">List</a>
      <a class="link" routerLink="stats">Stats</a>
      <a class="link" routerLink="prefs">preferences</a>
    </div>
    <router-outlet />`,
  styles: ``,
})
export class BooksComponent {}
