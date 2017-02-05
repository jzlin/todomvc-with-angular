import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

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
  private headers = new Headers({
    'Authorization': 'token c4178561-abf7-4f8b-8afd-53bdea8ed2aa',
    'Content-Type': 'application/json'
  });
  isDataSyncing = false;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.getTodos().subscribe(data => {
      this.todos = data || [];
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get('/me/todomvc', {headers: this.headers})
      .map(res => res.json())
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Todo[]>([]);
      });
  }

  saveTodos(todos: Todo[]) {
    return this.http.post('/me/todomvc', todos, {headers: this.headers})
      .map(res => res.json())
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.throw(error.json());
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
    this.saveTodos(newtodos).subscribe(data => {
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
    this.saveTodos(newtodos).subscribe(data => {
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

export class Todo {
  id: number;
  text: string;
  completed: boolean;
}
