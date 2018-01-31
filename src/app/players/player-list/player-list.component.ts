import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

import { PlayerService } from '../shared/player.service';
import { Player } from '../shared/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  playerList : AngularFireList<Player>
  constructor(private playerService : PlayerService) { }

  ngOnInit() {
    this.playerService.getData();
  }

}
