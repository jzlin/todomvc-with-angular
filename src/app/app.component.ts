import { Component, OnInit } from '@angular/core';
import { DataService, Todo } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todo: string;
  inputHint = 'What needs to be done?';
  todos: Todo[] = [];
  filterTodo: string;
  isAllComplete: boolean;
  isDataSyncing = false;

  constructor(private dataSvc: DataService) {
  }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(data => {
      this.todos = data || [];
    });
  }

  onEnter() {
    this.isDataSyncing = true;
    let newId = Date.now();
    while (this.todos.filter(todo => { return todo.id === newId; }).length > 0) {
      newId = Date.now();
    }
    let newtodos = Object.assign([], this.todos);
    newtodos.push({
      id: newId,
      text: this.todo,
      completed: false
    });
    this.dataSvc.saveTodos(newtodos).subscribe(data => {
      this.todos = data || [];
      this.todo = '';
      this.isDataSyncing = false;
    }, error => {
      this.isDataSyncing = false;
    });
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

  removeTodo(todo: Todo) {
    this.isDataSyncing = true;
    let todoIdx = this.todos.indexOf(todo);
    console.log(todoIdx);
    let newtodos = Object.assign([], this.todos);
    newtodos.splice(todoIdx, 1);
    this.dataSvc.saveTodos(newtodos).subscribe(data => {
      this.todos = data || [];
      this.isDataSyncing = false;
    }, error => {
      this.isDataSyncing = false;
    });
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => { return !todo.completed; });
  }

  filterTodos(filterTodo: string) {
    this.filterTodo = filterTodo;
  }
}
