import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
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

    // this.af.auth.subscribe(auth => {
    //   if(auth) {
    //     this.router.navigateByUrl('/players');
    //   }
    // });
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.auth.loginGoogle();
  }

}
