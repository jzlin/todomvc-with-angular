import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() todoAmount: number;
  @Output() clearCompleted = new EventEmitter<any>();
  @Output() filterTodos = new EventEmitter<string>();
  filterTodo = 'All';

  constructor() { }

  ngOnInit() {
  }

  filterTodosRequest(filterTodo: string) {
    this.filterTodo = filterTodo;
    this.filterTodos.emit(filterTodo);
  }

}
