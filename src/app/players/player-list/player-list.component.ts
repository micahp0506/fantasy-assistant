import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { Player } from '../shared/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  inputs: ['selectedTeam'],
  providers: [PlayerService]
})
export class PlayerListComponent implements OnInit {

  playerList : Player[];
  constructor(private playerService : PlayerService) { }

  ngOnInit() {
    this.playerList = this.playerService.getData();
  }

  onItemClick(player : Player) {
    this.playerService.selectedPlayer = Object.assign({},player);
  }

}
