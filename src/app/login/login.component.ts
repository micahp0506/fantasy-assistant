import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { moveIn } from '../router.animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(public af: AngularFireAuth,private auth: AuthService) {

  }

  ngOnInit() {
  }

  loginGoogle() {
    this.auth.loginGoogle();
  }

}
