import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private userURL = 'http://localhost:3000/api/';
  private todoURL = 'http://localhost:3000/api/todo/';

  constructor(private http: HttpClient) { }

  // getUserTodos functionality:
  //  - Takes in username from client and returns observable of all todo items associated with provided username
  getUserTodos(username){
    return this.http.get(this.userURL + username);
  }

  // deleteTodo functionality:
  //  - Takes in a todo id and returns observable from server
  deleteTodo(id){
    return this.http.delete(this.todoURL + id);
  }

  // addTodo functionality:
  //  - Takes in a todo object and returns observable from server
  addTodo(todo){
    return this.http.post(this.todoURL, todo);
  }
}
