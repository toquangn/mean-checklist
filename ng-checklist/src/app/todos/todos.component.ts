import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../../Todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  retrievedUsername: string;
  todos: Todo[];

  constructor(private _route: ActivatedRoute, private _todo: TodoService) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.retrievedUsername = params.username;
    });

    this.getTodos();
  }

  // Delete id, update list
  deleteTodo(id){
    var currentTodos = this.todos
    this._todo.deleteTodo(id)
      .subscribe(data => {
        console.log(data);
      });
  }

  getTodos(){
    this._todo.getUserTodos(this.retrievedUsername)
      .subscribe((data:Todo[]) => {
        this.todos = data;
      });
  }

}
