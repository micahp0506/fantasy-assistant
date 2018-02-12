import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model'

@Injectable()
export class TeamService {
  selectedTeam : Team = new Team();
  user: string;
  data;
  teamList;
  constructor(private db: AngularFireDatabase, private auth: AuthService,public af: AngularFireAuth) {
    this.data = db;
    this.teamList = this.data.list('Teams');

    this.af.authState.subscribe(auth => {
      if(auth) {
        this.user = auth.uid;
      }
    });
  }

  newTeam(team : Team, cb) {
    let teamObj: {[key: string]: any};
    teamObj = {
      name: team.name,
      owner: this.user,
      players: team.players
    };
    this.teamList.push(teamObj)
    .then(success => {
      teamObj.key = success.key;
      cb(teamObj);
    });
  }

  getTeamsByUser(cb) {
    let teams = this.db.list('Teams');
    let teamList = [];
    let team: {[key: string]: any};
    teams.snapshotChanges().subscribe(item => {
      item.forEach(e =>{
        team = e.payload.toJSON();
        team.key = e.key;
        if (team.owner === this.user) {
          teamList.push(team as Team);
        }
      });
    });

    cb(teamList);
  }

  insertPlayer(player : Player) {
    if (this.selectedTeam.players == undefined || this.selectedTeam.players == -1) {
      this.selectedTeam.players = [];

    }
    this.selectedTeam.players.push({
      key: Date.now() *-1,
      name: player.name,
      position: player.position,
      team: player.team
    });
    this.teamList.update(this.selectedTeam.key, {players: this.selectedTeam.players});
  }

  
}
