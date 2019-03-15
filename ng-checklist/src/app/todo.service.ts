import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private userURL = 'http://localhost:3000/api/';
  private todoURL = 'http://localhost:3000/api/todo/';

  constructor(private http: HttpClient) { }

  getUserTodos(username){
    return this.http.get(this.userURL + username);
  }

  deleteTodo(id){
    return this.http.delete(this.todoURL + id);
  }

  addTodo(todo){
    return this.http.post(this.todoURL, todo);
  }
}
