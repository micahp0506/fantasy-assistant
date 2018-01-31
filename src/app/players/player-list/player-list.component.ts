import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../shared/player.service';
import { Player } from '../shared/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  playerList : Player[];
  constructor(private playerService : PlayerService) { }

  ngOnInit() {
    let players = this.playerService.getData();
    players.snapshotChanges().subscribe(item => {
      this.playerList = [];
      item.forEach(e =>{
        let player = e.payload.toJSON();
        player["$key"] = e.key;
        this.playerList.push(player as Player);
      });
    });
  }

  onItemClick(player : Player) {
    this.playerService.selectedPlayer = Object.assign({},player);
  }

}
