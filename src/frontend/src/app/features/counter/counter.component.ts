import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CounterUIComponent } from "./pages/ui.component";

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CounterUIComponent],
  template: `
<h1 data-testid="counter-feature">Counter!</h1>
<br/><br/>
<app-counter-ui> </app-counter-ui>
  `,
  styles: ``,
})
export class CounterComponent {
  count = signal(0)
  fizzBuzz = computed( () => {
    let output ='';
    if (this.count() == 0) {
      return output;
    } 
    if (this.count() % 3 == 0) {
      output += 'Fizz';
    } 
    if (this.count() % 5 == 0) {
      output += 'Buzz';
    }
    return output;
  });
}
