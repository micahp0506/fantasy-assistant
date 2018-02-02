import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {

  name: any;
  state: string = '';

  constructor(public af: AngularFireAuth,private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

  }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

}
