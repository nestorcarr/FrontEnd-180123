import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {


currentUser : any;

  constructor (private tokenService: TokenService,
    private route: Router,
    private authService: AuthService
    ){
     this.authService.currentUser.subscribe(data=>{
      this.currentUser = data;
     })
    }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


  
      
  if (this.currentUser && (this.currentUser.roles.includes('ROLE_ADMIN') || this.currentUser.roles.includes('ROLE_USER'))){
    return true;
  } else{
    this.route.navigate(['/index']);     // ///////
    return false;
  }
}

}
