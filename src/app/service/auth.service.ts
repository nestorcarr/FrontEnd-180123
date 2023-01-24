import { HttpClient } from '@angular/common/http';
import { Injectable, SimpleChange } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //authURL = 'http://localhost:8080/auth/';
  //authURL = environment.URL + 'auth/';
  //authURL = environment.URL + 'login';
  authURL = 'https://argprograma-backend.onrender.com/login';
  currentUser: BehaviorSubject<any>;
  admin : BehaviorSubject<boolean>;


  constructor(private httpClient: HttpClient) {
    //this.currentUser = new BehaviorSubject('');
    this.currentUser = new BehaviorSubject<any>({
      "authToken" : sessionStorage.getItem('AuthToken'),
      "roles" : sessionStorage.getItem('AuthAuthorities'),
      "authUsername" : sessionStorage.getItem('AuthUsername') || []
     });
    this.admin = new BehaviorSubject<boolean>(false);
  }

 public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
   return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
 }
/*
 public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
   return this.httpClient.post<JwtDto>(this.authURL , loginUsuario)
 }
*/
login(usuario : LoginUsuario): Observable<any> {
  return this.httpClient.post(this.authURL, usuario)
  .pipe(map(data=>
    {
    this.currentUser.next(data);
      this.currentUser.subscribe(data => {
        if (data.roles.includes("ROLE_ADMIN")){
          this.admin.next(true);
        } else {
          this.admin.next(false);
        }
      })

    return data;
  }));
}


get usuarioAutenticado() {
  return this.currentUser.value;
}
}
