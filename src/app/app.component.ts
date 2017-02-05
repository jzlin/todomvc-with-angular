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

  onEnter() {
    this.todos.push(this.todo);
    this.todo = '';
  }
}
