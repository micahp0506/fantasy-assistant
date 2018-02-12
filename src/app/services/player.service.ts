import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { Player } from '../models/player.model'

@Injectable()
export class PlayerService {
  players: Observable<any[]>;
  playerList : AngularFireList<any>;
  selectedPlayer : Player = new Player();
  constructor(private firebase: AngularFireDatabase) {
    this.playerList = this.firebase.list('players');
    this.players = this.playerList.snapshotChanges().map(changes => {
      return changes.map(c =>({key: c.payload.key, ...c.payload.val()}));
    });
  }

  insertPlayer(player : Player) {
    this.playerList.push({
      name: player.name,
      position: player.position,
      team: player.team
    });
  }

  updatePlayer(player : Player) {
    this.playerList.update(player.$key, {
      name: player.name,
      position: player.position,
      team: player.team
    });
  }

  deletePlayer(key : string) {
    this.playerList.remove(key);
  }

}
