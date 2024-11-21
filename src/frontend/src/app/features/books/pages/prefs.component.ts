import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-books-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <h3>Sort column:</h3>
    <div class="join">
      <button class="btn join-item">Id</button>
      <button class="btn join-item">Title</button>
      <button class="btn join-item">Author</button>
      <button class="btn join-item">Year</button>
    </div>
    <h3>Sort direction</h3>
    <button class="btn join-item">Ascending</button>
    <button class="btn join-item">Descending</button>
    <button class="btn join-item">None</button>`,
  styles: ``,
})
export class BooksPrefsComponent {}
