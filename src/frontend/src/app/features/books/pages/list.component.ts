import { ChangeDetectionStrategy, Component, resource } from '@angular/core';
import { BookEntity } from '../books.component';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [],
  template: `
    <h1>Book List</h1>
    <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Author</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
  
    @for (b of books.value(); track b.id;){
        <tr>
        <td>{{b.id}}</td>
        <td>{{b.title}}</td>
        <td>{{b.author}}</td>
        <td>{{b.year}}</td>
      </tr>
    }
      
    </tbody>
  </table>
</div>
   
  `,
  styles: ``,
})
export class ListComponent {
    books = resource<BookEntity[], unknown>({
        loader: () =>
          fetch('/api/books')
            .then((res) => res.json())
            .then((r) => r.data),
      });
}
