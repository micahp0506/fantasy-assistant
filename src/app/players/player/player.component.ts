import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private playerService : PlayerService) {
    console.log("playerService", this.playerService);
    debugger;
  }


  ngOnInit() {
    this.resetForm();
  }


  onSubmit(form : NgForm) {
    if (form.value.$key == null) {
      this.playerService.insertPlayer(form.value);
    } else {
      this.playerService.updatePlayer(form.value);
    }
    this.resetForm(form);
  }

  resetForm(form? : NgForm) {
    console.log("form", form);
    debugger;
    if (form != null) {
      form.reset();
    }
    this.playerService.selectedPlayer = {
      $key: null,
      name: '',
      position: '',
      team: ''
    };
  }

  onDelete(form : NgForm) {
    if (confirm(`Are you sure you want to delete ${form.value.name} from your team?`)==true) {
      this.playerService.deletePlayer(form.value.$key);
      this.resetForm(form);
    }
  }

}
