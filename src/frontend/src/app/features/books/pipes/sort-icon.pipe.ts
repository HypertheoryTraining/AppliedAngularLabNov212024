import { Pipe, PipeTransform } from '@angular/core';
import { SortDirection } from '../types';
@Pipe({
  name: 'sorticon',
})
export class SortIconPipe implements PipeTransform {
  transform(value: SortDirection): string {
    switch (value) {
      case 'ascending':
        return '↑';
      case 'descending':
        return '↓';
      case 'none':
        return '';
    }
  }
}
