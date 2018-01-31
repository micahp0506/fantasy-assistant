import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Player } from './player.model'

@Injectable()
export class PlayerService {

  playerList : AngularFireList<any>;
  selectedPlayer : Player = new Player();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.playerList = this.firebase.list('players');
    return this.playerList;
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

  deletePlayer(player : Player) {
    this.playerList.remove()
  }

}
