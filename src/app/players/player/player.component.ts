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
  selectedPlayer;
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
    console.log("form", form);
    debugger;
    if (form.value.id == null) {
      this.teamService.insertPlayer(form.value);
    } else {
      this.teamService.updatePlayer(form.value);
    }
    this.resetForm(form);
  }

  resetForm(form? : NgForm) {
    if (form != null) {
      form.reset();
    }
    this.selectedPlayer = {
      id: null,
      name: '',
      position: '',
      team: ''
    };
  }

  onDelete(form : NgForm) {
    if (confirm(`Are you sure you want to delete ${form.value.name} from your team?`)==true) {
      this.playerService.deletePlayer(form.value.id);
      this.resetForm(form);
    }
  }

  onItemClick(player : Player) {
    console.log("player", player)
    debugger;
    this.selectedPlayer = Object.assign({},player);
  }


}
