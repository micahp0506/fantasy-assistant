import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Player } from '../models/player.model'

@Injectable()
export class PlayerService {

  playerList : AngularFireList<any>;
  selectedPlayer : Player = new Player();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    let players = this.firebase.list('players');
    let playerList = [];
    players.snapshotChanges().subscribe(item => {
      item.forEach(e =>{
        let player = e.payload.toJSON();
        player["$key"] = e.key;
        playerList.push(player as Player);
      });
    });

    return playerList;
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
