import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { Player } from '../models/player.model';
import { TeamService } from './team.service';

@Injectable()
export class PlayerService {
  teams: Observable<any>;
  teamList : AngularFireList<any>;
  selectedPlayer : Player = new Player();
  selectedTeam = this.teamService.selectedTeam;
  constructor(private firebase: AngularFireDatabase, private teamService: TeamService) {
    this.teamList = this.firebase.list('Teams');
  }

  insertPlayer(player : Player) {
    if (this.selectedTeam.players == undefined || this.selectedTeam.players == -1) {
      this.selectedTeam.players = {};

    }
    this.selectedTeam.players.push({
      id: Date.now() *-1,
      name: player.name,
      position: player.position,
      team: player.team
    });
    this.teamList.update(this.selectedTeam.key, {players: this.selectedTeam.players});
  }

  updatePlayer(player : Player) {
    this.selectedTeam.players.map((p)=> {
      if (p.id == player.id) {
        p.id = player.id;
        p.name = player.name;
        p.position = player.position;
        p.team = player.team;
      }
    });

    this.teamList.update(this.selectedTeam.key, {players: this.selectedTeam.players});
  }

  deletePlayer(playerId) {
    let tempArray = [];
    this.selectedTeam.players.map((p)=> {
      if (p.id != playerId) {
        tempArray.push(p);
      }
    });

    this.selectedTeam.players = tempArray;
    this.teamList.update(this.selectedTeam.key, {players: this.selectedTeam.players});
  }

}
