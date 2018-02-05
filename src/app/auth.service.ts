import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService  {
  constructor(private af: AngularFireAuth, private router: Router) {
  }

  signUp(email: string, password: string, cb) {
    this.af
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(success => {
        this.router.navigate(['/players']);
        console.log('Noice, it worked!', success);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        cb(err);
      });
  }

  logIn(email: string, password: string) {
    this.af
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(success => {
        this.router.navigate(['/players']);
        console.log('Noice, it worked!', success);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  loginGoogle() {
    this.af
      .auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(success => {
        this.router.navigate(['/players']);
        console.log('Noice, it worked!', success);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      })
  }

  logOut() {
    this.af
      .auth
      .signOut()
      .then(success => {
        this.router.navigate(['/login']);
        console.log('Noice, it worked!', success);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

}
