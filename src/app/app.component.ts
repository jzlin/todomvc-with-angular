import { Component, OnInit } from '@angular/core';
import { DataService, Todo } from './data.service';
import { Observable, Subject } from 'rxjs';

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
  private keyUp = new Subject<string>();

  constructor(private dataSvc: DataService) {
    const observable = this.keyUp
      .debounceTime(200)
      .subscribe((data) => {
        this.dataSvc.saveTodoInputText(this.todo).subscribe(data => {
          // console.log(data);
        }, error => {
          console.log(error);
        });
      });
  }

  ngOnInit() {
    this.dataSvc.getTodoInputText().subscribe(data => {
      this.todo = data || '';
    });
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

  enterEditMode(todo: Todo) {
    todo.editingText = todo.text;
    todo.isEditMode = true;
  }

  updateTodo(todo: Todo) {
    this.isDataSyncing = true;
    let todoIdx = this.todos.indexOf(todo);
    let newtodos = Object.assign([], this.todos);
    newtodos[todoIdx].text = newtodos[todoIdx].editingText;
    this.dataSvc.saveTodos(newtodos).subscribe(data => {
      this.todos = data || [];
      this.isDataSyncing = false;
    }, error => {
      this.isDataSyncing = false;
    });
  }
}
