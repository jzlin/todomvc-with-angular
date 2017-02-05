import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, filterTodo?: string): any {
    if (filterTodo && typeof filterTodo.toLowerCase === 'function') {
      var filter = filterTodo.toLowerCase();

      switch (filter) {
        case 'active':
          return value.filter(todo => { return !todo.completed; });

        case 'completed':
          return value.filter(todo => { return todo.completed; });
      }
    }
    return value;
  }

}
