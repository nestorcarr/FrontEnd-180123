import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/model/banner';
import { Persona } from 'src/app/model/persona';
import { BannerService } from 'src/app/service/banner.service';
import { PersonaService } from 'src/app/service/persona.service';
//import { InfoService } from '../../../service/info/info.service';

@Component({
  selector: 'app-acercademi',
  templateUrl: './acercademi.component.html',
  styleUrls: ['./acercademi.component.css']
})

export class AcercademiComponent implements OnInit {
  //Inicializo y Creo la variable de instancia para almacenar los datos que trata el servicio
  personas: Persona[] = [];//any=[];
  persona : Persona = {
    id: 0,
    nombre: "",
    apellido: "",
    profesion: "",
    acerca_de_mi: "",
    acercademi: "",
    imageprincipal: ""
  };

  banners : Banner[] = [];
  banner : Banner = {
    id: 0,
    carouselimag:'',
    carouselimage: '',
    carouselimagen: '',
    imageprincipal:''
  }
  //Esta es una manera pero no la correcta
  //nombre ='Nestor Alfredo';
  //apellido = "Carretino";
  /*
  api = "persona/ver"

  //acercademiUno: any;
  nombre: string = '';
  apellido: string = '';
  profesion: string = '';
  acerca_de_mi: string = '';
  acercademi: string = '';
  imagenprincipal: string = '';
  encabezados: string = '';
*/
    constructor(
    //Inyectar el Servicio para tener acceso en la Clase a los Metodos
      //private infoService: InfoService,
      private sPersona:PersonaService,
      private sBanner : BannerService
      //private personaService: PersonaService
    //Inyectar objeto router para permitir la navegacion a la pagina individual
    //private router: Router
    ) {this.cargarPersona();}

    ngOnInit(): void{

    }
    cargarPersona():void {
      this.sPersona.lista().subscribe(bd => {
        this.personas = bd
    });
      this.sBanner.lista().subscribe(data=>{
        this.banner = data[0];
      })
    }
}
