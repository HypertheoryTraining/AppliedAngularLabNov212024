import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p data-testid="fizzBuzz">{{ fizzBuzz() }}</p>
      <button
        class="btn btn-primary"
        (click)="decreaseIncrement()"
        (click)="isFizzBuzz()"
        [disabled]="isDecrementDisabled()"
      >
        -
      </button>
      <span data-testid="current">{{ counter() }}</span>
      <button
        class="btn btn-primary"
        (click)="increaseIncrement()"
        (click)="isFizzBuzz()"
      >
        +
      </button>
    </div>
  `,
  styles: [],
})
export class UiComponent {
  counter = signal(0);
  fizzBuzz = signal('');

  isDecrementDisabled = computed(() => this.counter() <= 0);

  increaseIncrement() {
    this.counter.update((value) => value + 1);
  }

  decreaseIncrement() {
    if (this.counter() > 0) {
      this.counter.update((value) => value - 1);
    }
  }

  isFizzBuzz() {
    if (this.counter() % 5 === 0 && this.counter() % 3 === 0) {
      this.fizzBuzz.update(() => 'fizzBuzz');
    } else if (this.counter() % 3 === 0) {
      this.fizzBuzz.update(() => 'fizz');
    } else if (this.counter() % 5 === 0) {
      this.fizzBuzz.update(() => 'buzz');
    }
  }
}
