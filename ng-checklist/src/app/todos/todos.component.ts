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

  username: string;
  todos: Todo[];

  todoTitle: string;
  todoPriority: number;

  constructor(private _route: ActivatedRoute, private _todo: TodoService) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.username = params.username;
    });
    this.getTodos();
  }

  addTodo(){
    const todoItem = { username: this.username, todo: this.todoTitle, complete: false, priority: this.todoPriority};

    if (!this.todoPriority){
      this.todoPriority = 3; // Setting todo as lowest priority
    }
    this._todo.addTodo(todoItem).subscribe( data => {
      this.getTodos();
      this.resetPage();
    });


  }

  // Delete id, update list
  deleteTodo(id) {
    this._todo.deleteTodo(id).subscribe(successful => {
      if (successful) {
        this.getTodos();
      }
    });
  }

  getTodos(){
    this._todo.getUserTodos(this.username)
      .subscribe((data:Todo[]) => {
        this.todos = data;
      });
  }

  resetPage(){
    this.todoTitle = "";
    this.todoPriority = undefined;
  }

}
