
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

import { Observable } from 'rxjs';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate{


  constructor(private router: Router, private loginService: LoginService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.loginService.currentUserValue;

    if (currentUser) {
        
        return true;
    }

    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
