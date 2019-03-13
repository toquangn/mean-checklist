import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  // registerUser gathers user input from register component and runs the registerUser function from AuthService (results are logged, errors get alerted)
  registerUser(){
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log('register component - registerUser: ', res);
          this._router.navigate(['/todos'], {queryParams: {username: res.username}});
        },
        err => { alert(err.error); }
      );
  }

}
