import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = 'http://localhost:3000/api/register';
  private loginURL = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  // registerUser functionality:
  //  - Takes in user object and returns observable from server
  registerUser(user){
    return this.http.post<any>(this.registerURL, user);
  }

  // loginUser functionality:
  //  - Takes in user object and returns observable from server
  loginUser(user){
    return this.http.post<any>(this.loginURL, user);
  }

  // loggedIn functionality:
  //  - Return boolean to verify if token exists within local storage
  loggedIn(){
    return localStorage.hasOwnProperty('token');
  }
}
