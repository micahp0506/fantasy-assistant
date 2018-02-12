import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { AuthService } from '../services/auth.service';
import { Team } from '../models/team.model'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [TeamService]
})
export class TeamsComponent implements OnInit {
  usersExistingTeam;
  usersNewTeam : Team = new Team();
  selectedTeam : Team = new Team();
  userName: string = '';
  teams = [];
  showDraft: boolean = true;
  constructor(public af: AngularFireAuth,private teamService : TeamService,private auth: AuthService) {
    this.af.authState.subscribe(auth => {
      if(auth && auth.displayName != null) {
        this.userName = auth.displayName;
      } else if (auth && auth.displayName == null && auth.email != null) {
        this.userName = auth.email;
      }
    });
  }

  ngOnInit() {
    this.teamService.getTeamsByUser((result)=> {
      this.teams = result;
    });
  }

  newTeam() {
    this.teamService.insertTeam(this.usersNewTeam, ((result)=> {
      this.teamService.selectedTeam = result;
      this.showDraft = false;
    }));
  }

  existingTeam(team: Team) {
    this.teamService.selectedTeam = this.usersExistingTeam;
    this.showDraft = false;
  }

  logout() {
    this.auth.logOut();
  }


}
