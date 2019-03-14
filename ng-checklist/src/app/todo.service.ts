import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getUserTodos(username){
    return this.http.get(`http://localhost:3000/api/${username}`);
  }

  deleteTodo(id){
    return this.http.delete(`http://localhost:3000/api/todo/${id}`);
  }
}
