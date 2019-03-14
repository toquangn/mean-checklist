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
  priorityDropdown = [{ priority: 1, label: "High" }, { priority: 2, label: "Medium" },{ priority: 3, label: "Low (Default)" }];

  retrievedUsername: string;
  todos: Todo[];

  todoTitle: string;
  todoPriority: number;

  constructor(private _route: ActivatedRoute, private _todo: TodoService) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.retrievedUsername = params.username;
    });

    this.getTodos();
  }

  addTodo(){
    // Set to lowest priority if empty
    if (!this.todoPriority){
      this.todoPriority = 3;
    }
  }

  // Delete id, update list
  /*
  deleteTodo(id){
    this._todo.deleteTodo(id)
      .subscribe(data => {
        if (data.n == 1){
          this.getTodos();
        }
      });
  }
  */

  getTodos(){
    this._todo.getUserTodos(this.retrievedUsername)
      .subscribe((data:Todo[]) => {
        this.todos = data;
      });
  }

  print(){
    alert(this.todoPriority);
  }

}
