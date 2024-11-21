import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterComponent } from '../counter.component';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div style="height: 2em ;"><span fizzBuzz="current" style="height: 1em ;">{{parent.fizzBuzz()}}</span></div>
<div>
  <button class="btn btn-primary" (click) = "increment(-1)" [disabled]="parent.count() <1">-</button>
  <span data-testid="current">{{parent.count()}}</span>
  <button class="btn btn-primary " (click) = "increment(1)">+</button>
</div>
  `,
  styles: ``,
})
export class CounterUIComponent {
    constructor(public parent: CounterComponent) {

    }

    increment(inputValue: number) {
        this.parent.count.update(value => value + inputValue);
      }
    
}
