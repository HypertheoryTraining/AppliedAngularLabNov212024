import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div data-testid="counter-feature-ui">
      <button
        (click)="decrement()"
        [disabled]="counterAtZero()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="current">{{ counter() }}</span>
      <button (click)="increment()" class="btn btn-primary">+</button>

      <div>
        <p>{{ fizzBuzz() }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  counter = signal(0);

  increment() {
    this.counter.update(() => this.counter() + 1);
  }

  decrement() {
    this.counter.update(() => this.counter() - 1);
  }

  counterAtZero = computed(() => this.counter() === 0);
  counterDivisibleBy3 = computed(() => this.counter() % 3 === 0);
  counterDivisibleBy5 = computed(() => this.counter() % 5 === 0);

  fizzBuzz = computed(() => {
    const current = this.counter();
    let text = '';
    if (!this.counterAtZero()) {
      if (current % 3 === 0) text += 'Fizz';
      if (current % 5 === 0) text += 'Buzz';
    }
    return text;
  });
}
