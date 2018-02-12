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
  constructor(private firebase: AngularFireDatabase, private teamService: TeamService) {
    this.teamList = this.firebase.list('Teams');
    this.teams = this.teamList.snapshotChanges().map(changes => {
      console.log("changes", changes);
      changes.map((c)=> {
        console.log("c", c);
      });
      // return changes.map(c =>({key: c.payload.key, ...c.payload.val()}));
    });
  }

  insertPlayer(player : Player) {
    console.log("player", player);
    console.log("this", this);
    debugger;
    this.teamList.push({
      name: player.name,
      position: player.position,
      team: player.team
    });
  }

  updatePlayer(player : Player) {
    this.teamList.update(player.$key, {
      name: player.name,
      position: player.position,
      team: player.team
    });
  }

  deletePlayer(key : string) {
    this.teamList.remove(key);
  }

}
