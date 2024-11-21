import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: ` <div class="flex gap-8">
      <a class="link" routerLink="list">List</a>
      <a class="link" routerLink="stats">Stats</a>
      <a class="link" routerLink="prefs">Preferences</a>
    </div>
    <router-outlet />`,
  styles: ``,
})
export class BooksComponent {}
