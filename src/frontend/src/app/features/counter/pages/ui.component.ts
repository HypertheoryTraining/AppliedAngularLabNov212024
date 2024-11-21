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
      <button
        class="btn btn-primary"
        (click)="decreaseIncrement()"
        [disabled]="isDecrementDisabled()"
      >
        -
      </button>
      <span data-testid="current">{{ counter() }}</span>
      <button class="btn btn-primary" (click)="increaseIncrement()">+</button>
    </div>
  `,
  styles: [],
})
export class UiComponent {
  counter = signal(0);

  isDecrementDisabled = computed(() => this.counter() <= 0);

  increaseIncrement() {
    this.counter.update((value) => value + 1);
  }

  decreaseIncrement() {
    if (this.counter() > 0) {
      this.counter.update((value) => value - 1);
    }
  }
}
