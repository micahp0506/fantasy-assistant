import { Injectable } from '@angular/core';

import { Player } from './player.model'

@Injectable()
export class PlayerService {

  selectedPlayer : Player = new Player();
  constructor() { }

}
