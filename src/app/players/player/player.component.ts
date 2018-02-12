import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  inputs: ['selectedTeam'],
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit{
  playerList;
  constructor(private playerService : PlayerService, private teamService : TeamService) {
  }


  ngOnInit() {
    this.resetForm();
    this.playerList = this.playerService.players;
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

  onItemClick(player : Player) {
    this.playerService.selectedPlayer = Object.assign({},player);
  }


}
