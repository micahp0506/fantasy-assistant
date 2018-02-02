import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { PlayerService } from './shared/player.service'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayerService]
})
export class PlayersComponent implements OnInit {

  name: any;
  state: string = '';
  constructor(private playerService : PlayerService,public af: AngularFireAuth,private router: Router) {

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
