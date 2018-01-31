import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  constructor(private playerService : PlayerService) { }

  ngOnInit() {
  }

}
