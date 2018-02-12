import { Component, OnInit, OnChanges } from '@angular/core';
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
export class PlayerComponent implements OnInit, OnChanges{
  playerList;
  selectedTeam;
  constructor(private playerService : PlayerService, private teamService : TeamService) {
  }


  ngOnInit() {
    console.log("this", this);
    debugger;
    if (this.selectedTeam != null && this.selectedTeam.key == null && this.selectedTeam.players == -1) {
      this.selectedTeam.players = [];
    }
    this.resetForm();
    this.playerList = this.playerService.teams;
  }

  ngOnChanges() {
    console.log("this", this);
    debugger;
    if (this.selectedTeam != null && this.selectedTeam.key != null && this.selectedTeam.players == -1) {
      this.selectedTeam.players = [];
    }
  }

  onSubmit(form : NgForm) {
    if (form.value.$key == null) {
      this.teamService.insertPlayer(form.value);
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
