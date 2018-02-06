import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth,private auth: AuthService) {

  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      let email= formData.value.email;
      let password= formData.value.password;
      this.auth.signUp(email, password, result => {
        console.log("result", result);
        this.error = result.message;
      });
    }
  }

}
