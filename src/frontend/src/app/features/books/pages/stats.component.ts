import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookStore } from '../book.store';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [],
  template: `
    <h1>Stats</h1>
    <div>
      <h3>Total Books : {{store.totalBooks()}} </h3>
      <h3>Earliest Published Book : {{store.earliestPublishedBook()?.title}} </h3>
      <h3>Most Recent  Published Book : {{store.recentPublishedBook()?.title}} </h3>
      <h3>Average Pages : {{store.averageNoOfPages()}} </h3>
    </div> 
   
  `,
  styles: ``,
})
export class StatsComponent {
  store = inject(BookStore);

}
