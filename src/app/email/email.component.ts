import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

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

  constructor(public af: AngularFireAuth,private router: Router) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/players');
      }
    });
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
          email: formData.value.email,
          password: formData.value.password
        },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then(
        (success) => {
          console.log(success);
          this.router.navigate(['/players']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
    }
  }

  ngOnInit() {
  }

}
