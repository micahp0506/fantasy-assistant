import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [TeamService]
})
export class TeamsComponent implements OnInit {
  userName: string = '';
  constructor(public af: AngularFireAuth,private teamService : TeamService,private auth: AuthService) {
    this.af.authState.subscribe(auth => {
      if(auth && auth.displayName != null) {
        console.log("auth", auth);
        this.userName = auth.displayName;
      } else if (auth && auth.displayName == null && auth.email != null) {
        this.userName = auth.email;
      }
    });
  }

  ngOnInit() {
  }

  teamSubmit(form : NgForm) {
    if (form.value.$key == null) {
      this.teamService.insertTeam(form.value);
    }
    // else {
    //   this.playerService.updatePlayer(form.value);
    // }
    // this.resetForm(form);
  }

}

