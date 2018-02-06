import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

import { Team } from '../models/team.model'

@Injectable()
export class TeamService {

  teamList : AngularFireList<any>;
  selectedTeam : Team = new Team();
  user: string;
  constructor(private firebase: AngularFireDatabase, private auth: AuthService,public af: AngularFireAuth) {
    this.af.authState.subscribe(auth => {
      if(auth) {
        console.log("auth", auth);
        debugger;
        this.user = auth.uid;
      }
    });
  }

  // getData() {
  //   this.playerList = this.firebase.list('players');
  //   return this.playerList;
  // }

  insertTeam(team : Team) {
    console.log("this", this);
    debugger;
    this.teamList.push({
      name: team.name,
      owner: this.user,
      players: []
    });
  }

  // updatePlayer(player : Player) {
  //   this.playerList.update(player.$key, {
  //     name: player.name,
  //     position: player.position,
  //     team: player.team
  //   });
  // }

  // deletePlayer(key : string) {
  //   this.teamList.remove(key);
  // }

}
