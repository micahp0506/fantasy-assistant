import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import 'rxjs/add/operator/switchMap';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { Team } from '../models/team.model'

@Injectable()
export class TeamService {
  selectedTeam : Team = new Team();
  user: string;
  teamList;
  constructor(private db: AngularFireDatabase, private auth: AuthService,public af: AngularFireAuth) {
    this.teamList = this.db.list('Teams');

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
      players: []
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
}
