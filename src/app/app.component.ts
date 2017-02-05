import { Component } from '@angular/core';
import { Http } from '@angular/http';

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
  isAllComplete: boolean;

  constructor(private http: Http) {
  }

  onEnter() {
    this.todos.push({
      text: this.todo,
      completed: false
    });
    this.todo = '';
  }

  toggleAll() {
    if (this.isAllComplete) {
      this.todos.forEach(todo => { todo.completed = false; });
      this.isAllComplete = false;
    }
    else {
      this.todos.forEach(todo => { todo.completed = true; });
      this.isAllComplete = true;
    }
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => { return !todo.completed; });
  }

  filterTodos(filterTodo: string) {
    this.filterTodo = filterTodo;
  }
}
