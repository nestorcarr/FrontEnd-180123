import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
//import { InfoService } from '../../../service/info/info.service';
@Component({
  selector: 'app-acercademidash',
  templateUrl: './acercademidash.component.html',
  styleUrls: ['./acercademidash.component.css']
})
export class AcercademidashComponent implements OnInit {


    //Inicializo y Creo la variable de instancia para almacenar los datos que trata el servicio
    personas: Persona[] = [];//any=[];
  //acercademiUno: any;
  /*nombre: string = '';
  apellido: string = '';
  profesion: string = '';
  acerca_de_mi: string = '';
  acercademi: string = '';
*/
  persona : Persona = {
    id: 0,
    nombre: "",
    apellido: "",
    profesion: "",
    acerca_de_mi: "",
    acercademi: "",
    imageprincipal: ""
  };

  constructor(
    //Inyectar el Servicio para tener acceso en la Clase a los Metodos
    //private infoService: InfoService
    private sPersona:PersonaService,
    private tokenService: TokenService
  ) { }

  IsLogged = false;

  ngOnInit(): void{
    this.cargarPersona();
    if(this.tokenService.getToken()){
      this.IsLogged = true;
    }else{
      this.IsLogged = false;
    }
  }

  ngOnChanges() : void {
    this.cargarPersona();
  }

  cargarPersona():void {
    this.sPersona.lista().subscribe(bd => {
      this.personas = bd
  });
  }

  actualizarComponente(event : Event){
    this.cargarPersona();
  }

  actualizarVariable(per: Persona): void{
    this.persona =  per;
  }

  /*delete(id: number){
    if(id != undefined){
      this.sPersona.delete(id).subscribe(
        bd => {
        //alerta que la Persona ha sido eliminada
        alert("Persona eliminada");
        this.cargarPersona();
    })
  }
  }*/

}
/*
, err =>{
      alert("No se pudo eliminar la persona");
    }*/
