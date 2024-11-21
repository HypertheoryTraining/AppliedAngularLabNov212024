import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [],
  template: `
    <h1>Stats</h1>
   
  `,
  styles: ``,
})
export class StatsComponent {

}
