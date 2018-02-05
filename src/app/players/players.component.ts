import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { PlayerService } from './shared/player.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayerService]
})
export class PlayersComponent implements OnInit {

  userName: string = '';
  constructor(private playerService : PlayerService,public af: AngularFireAuth,private auth: AuthService) {

    this.af.authState.subscribe(auth => {
      if(auth && auth.displayName != null) {
        console.log("auth", auth);
        this.userName = auth.displayName;
      } else if (auth && auth.displayName == null && auth.email != null) {
        this.userName = auth.email;
      }
    });

  }

  ngOnInit() {
  }

  logout() {
    this.auth.logOut();
  }

}
