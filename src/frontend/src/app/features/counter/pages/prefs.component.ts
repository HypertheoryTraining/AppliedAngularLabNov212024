import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Counter Preferences</p>
    <div class="join">
      <button class="btn join-item">1</button>
      <button class="btn join-item">3</button>
      <button class="btn join-item">5</button>
    </div>`,
  styles: ``,
})
export class PrefsComponent {}
