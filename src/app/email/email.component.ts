import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth,private auth: AuthService) {
    // this.af.auth.subscribe(auth => {
    //   if(auth) {
    //     this.router.navigateByUrl('/players');
    //   }
    // });
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      let email= formData.value.email;
      let password= formData.value.password;
      this.auth.logIn(email, password);
    }
  }

  ngOnInit() {
  }

}
