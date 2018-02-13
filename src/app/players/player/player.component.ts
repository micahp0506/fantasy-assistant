import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
declare let jsPDF: any;

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
    if (this.selectedTeam != null && this.selectedTeam.key == null && this.selectedTeam.players == -1) {
      this.selectedTeam.players = [];
    }
    this.resetForm();
    this.playerList = this.playerService.teams;
  }

  ngOnChanges() {
    if (this.selectedTeam != null && this.selectedTeam.key != null && this.selectedTeam.players == -1) {
      this.selectedTeam.players = [];
    }
  }

  onSubmit(form : NgForm) {
    if (form.value.id == null) {
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
    this.selectedPlayer = {
      id: null,
      name: '',
      position: '',
      team: '',
    };
  }

  onDelete(form : NgForm) {
    if (confirm(`Are you sure you want to delete ${form.value.name} from your team?`)==true) {
      this.playerService.deletePlayer(form.value.id);
      this.resetForm(form);
    }
  }

  onItemClick(player : Player) {
    this.selectedPlayer = Object.assign({},player);
  }


  downloadTeam() {
    let teamName = this.selectedTeam.name;
    let doc = new jsPDF('p', 'pt');
    let col = [
      {title: "Name", dataKey: "name"},
      {title: "Position", dataKey: "position"},
      {title: "Team", dataKey: "team"},
     ];
    let header = function(data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.text("Team: " + teamName, data.settings.margin.left, 50);
    };
    let options = {
      addPageContent: header,
      margin: {
        top: 80
      }
    };
    doc.autoTable(col, this.selectedTeam.players, options);
    doc.save('Team.pdf');
  }
}
