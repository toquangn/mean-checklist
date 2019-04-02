import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = 'http://localhost:3000/api/register';
  private loginURL = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private _router: Router) { }

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

  // getToken functionality:
  // - Return token from local storage
  getToken(){
    return localStorage.getItem('token');
  }

  // logoutUser functionality:
  // - Called from app.component.html navbar
  // - Removes token from local storage and navigates to login component
  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
