import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>
      <a routerLink="ui">UI</a>
      <a routerLink="prefs">Prefs</a>
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class CounterComponent {}
