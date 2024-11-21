import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-12">
      <a routerLink="ui" class="btn btn-primary">UI</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class CounterComponent {}
