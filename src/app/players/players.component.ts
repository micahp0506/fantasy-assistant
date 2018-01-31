import { Component, OnInit } from '@angular/core';

import { PlayerService } from './shared/player.service'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayerService]
})
export class PlayersComponent implements OnInit {

  constructor(private playerService : PlayerService) { }

  ngOnInit() {
  }

}
