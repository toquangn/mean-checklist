import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {}

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  // loginUser gathers user input from login component and runs the loginUser function from AuthService (results are logged, errors get alerted)
  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          //console.log('login component - loginUser: ', res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/todos'], {queryParams: {username: res.username}}); // Passes username information to todos component through url params

        },
        err => { alert(err.error); }
      );
  }

}
