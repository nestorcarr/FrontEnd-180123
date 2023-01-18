import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  //accessToken: string = "";
  //username: string = "";

  constructor (private tokenService: TokenService,
    private route: Router,
    private authService: AuthService
    ){
     /* this.authService.currentUser.subscribe(data=>{
        this.accessToken = data.accessToken;
        this.username = data.user;
      });*/
    }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


  let currentUser = this.authService.usuarioAutenticado;
    if (currentUser && currentUser.id && this.tokenService.getAuthorities().includes("ROLE_ADMIN")){
      return true;
  } else{
    this.route.navigate(['/index']);     // ///////
    return true;
  }
}

}
