import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;
  email;
  password;
  constructor(public af: AngularFireAuth,private auth: AuthService) {
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      let email= formData.value.email;
      let password= formData.value.password;
      this.auth.logIn(email, password, result => {
        this.error = result.message;
        console.log("result", result);
      });
    }
  }

  ngOnInit() {
  }

}
