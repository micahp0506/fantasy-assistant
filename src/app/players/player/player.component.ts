import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private playerService : PlayerService) { }

  ngOnInit() {
    this.resetForm();
  }


  onSubmit(form : NgForm) {
    if (form.value.$key == '') {
      this.playerService.insertPlayer(form.value);
    } else {
      this.playerService.updatePlayer(form.value);
    }
    this.resetForm(form);
  }

  resetForm(form? : NgForm) {
    if (form != null) {
      form.reset();
    }
    this.playerService.selectedPlayer = {
      $key: '',
      name: '',
      position: '',
      team: ''
    };
  }

}
