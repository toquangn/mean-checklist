import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../../todo';
import { HttpErrorResponse } from '@angular/common/http';


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

  constructor(private _router: Router, private _route: ActivatedRoute, private _todo: TodoService) { }

  // On initiation functionality:
  //  - Set username variable as username passed by register/login component with queryParams
  //  - Get todo list for corresponding username and assign it to todos array
  ngOnInit() {
    this._route.queryParams.subscribe( params => {
      this.username = params.username;
    });
    this.getTodos();
  }

  // addTodo functionality:
  //  *** Asynchronous call in order to complete service call before reseting page (which makes priority == undefined) ****
  //  - If priority is undefined, set priority to 3 (low priority) as default
  //  - Creates a todo item JSON to be passed to the todo service
  //  - Call and subscribe to addTodo method from service.
  //      - If successful, update the todos array and reset the page
  async addTodo(){
    if (!this.todoPriority){
      this.todoPriority = 3;
    }

    const todoItem = await { username: this.username, todo: this.todoTitle, complete: false, priority: this.todoPriority};

    await this._todo.addTodo(todoItem).subscribe( data => {
      this.getTodos();
    });

    this.resetPage();

  }

  // deleteTodo functionality:
  //  - Uses '_id' attribute inherent to mongodb's document architecture for deletion
  //  - Call and subscribe to deleteTodo method from todo service using the associated document's _id attribute
  //      - If successful, update the todos array
  deleteTodo(id) {
    this._todo.deleteTodo(id).subscribe(successful => {
      if (successful) {
        this.getTodos();
      }
    });
  }

  // completeTodo functionality:
  //  - Uses '_id' attribute inherent to mongodb's document architecture for completing todo
  //  - Call and subscribe to updateTodo method from todo service using the associated document's _id attribute
  //      - If successful, update the todos array
  completeTodo(id) {
    this._todo.completeTodo(id).subscribe(successful => {
      if (successful) {
        this.getTodos();
      }
    });
  }

  // getTodos functionality:
  //  - Call and subscribe to getUserTodos method from the todo service
  //    - If successful, assign todos array to resulting JSON
  getTodos(){
    this._todo.getUserTodos(this.username)
      .subscribe((data:Todo[]) => {
        this.todos = data;
      },
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
             this._router.navigate(['/login']);
          }
        }
      });
  }

  // resetPage functionality:
  //  - Resets todo form and priority dropdown
  resetPage(){
    this.todoTitle = "";
    this.todoPriority = undefined;
  }

}
