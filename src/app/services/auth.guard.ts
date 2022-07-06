import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private firebaseAuth: AngularFireAuth,private auth:AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged((user: any) => {
        if (user) {
          console.log('sd',user)
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/admin']);
          resolve(false);
        }
      });
    });
  }
  
}
