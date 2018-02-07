import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

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

  insertTeam(team : Team, cb) {
    let teamObj = {
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
    teams.snapshotChanges().subscribe(item => {
      item.forEach(e =>{
        let team = e.payload.toJSON();
        team.key = e.key;
        if (team.owner === this.user) {
          teamList.push(team as Team);
        }
      });
    });

    cb(teamList);
    // return teamList;
  }

  // getData() {
  //   this.playerList = this.firebase.list('players');
  //   return this.playerList;
  // }

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
