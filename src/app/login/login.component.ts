import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(public af: AngularFireAuth,private auth: AuthService,private router: Router) {

  }

  ngOnInit() {
  }

  loginGoogle() {
    this.auth.loginGoogle();
  }

  loginEmail() {
    this.router.navigate(['/login-email']);
  }

}
