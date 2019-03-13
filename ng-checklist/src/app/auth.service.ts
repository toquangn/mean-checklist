import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = 'http://localhost:3000/api/register';
  private loginURL = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  registerUser(user){
    return this.http.post<any>(this.registerURL, user);
  }

  loginUser(user){
    return this.http.post<any>(this.loginURL, user);
  }
}
