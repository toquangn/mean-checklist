import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {}

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  // loginUser gathers user input from register component and runs the loginUser function from AuthService (results are logged, errors get alerted)
  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => { console.log(res); },
        err => { alert(err.error); }
      );
  }

}
