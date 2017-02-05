import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: string;
  inputHint = 'What needs to be done?';
  todos: Array<any> = [];
  filterTodo: string;

  onEnter() {
    this.todos.push({
      text: this.todo,
      completed: false
    });
    this.todo = '';
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => { return !todo.completed; });
  }

  filterTodos(filterTodo: string) {
    this.filterTodo = filterTodo;
  }
}
