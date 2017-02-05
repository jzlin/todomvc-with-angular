import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  private headers = new Headers({
    'Authorization': 'token c4178561-abf7-4f8b-8afd-53bdea8ed2aa',
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) { }

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

}

export class Todo {
  id: number;
  text: string;
  completed: boolean;
}
