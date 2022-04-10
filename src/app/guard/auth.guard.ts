import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private as:AuthService,private r:Router){

  }

  canActivate(): boolean{
    if (this.as.loggedIn()) {
      return true;
    }
    this.r.navigate(['/signin']);
    return false;
  }

}
