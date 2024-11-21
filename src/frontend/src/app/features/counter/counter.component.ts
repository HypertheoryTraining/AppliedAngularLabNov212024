import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    html
    <div>Starting</div>
  `,
  styles: ``,
})
export class CounterComponent {}
