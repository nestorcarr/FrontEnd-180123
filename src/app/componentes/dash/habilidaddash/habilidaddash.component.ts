import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/model/habilidad';
import { AuthService } from 'src/app/service/auth.service';
import { HabilidadService } from 'src/app/service/habilidad.service';
//Importo el servicio
//import { InfoService } from '../../../service/info/info.service';

@Component({
  selector: 'app-habilidaddash',
  templateUrl: './habilidaddash.component.html',
  styleUrls: ['./habilidaddash.component.css']
})
export class HabilidaddashComponent implements OnInit {
  habilidades: Habilidad[] = [];//any=[];
  //Inicializo y Creo la variable de instancia para almacenar los datos que trata el servicio
   /*habilidades: any=[];
   habilidadess: string="";
   idiomas: string="";
   lecturas: string="";
   conversacions: string="";//////////////
   porcentajelect: string="";
   porcentajeconvers: string="";
*/
  habilidad : Habilidad = {
   id: 0,
   habilidad: "",
   porcentaje: 0,
   color: ""
  };

  admin : boolean = false;

  constructor(
    //Inyectar el Servicio para tener acceso en la Clase a los Metodos
    //private infoService: InfoService
    private sHabilidad:HabilidadService,
    private authService : AuthService
    ) { 
      this.authService.admin.subscribe(data =>{
        this.admin = data;
      })
    }

  ngOnInit() {
    this.cargarHabilidad();
  }

  ngOnChanges() : void {
    this.cargarHabilidad();
  }

  cargarHabilidad():void {
    this.sHabilidad.lista().subscribe(bd => {
      this.habilidades = bd
  });
  }

  actualizarComponente(event : Event){
    this.cargarHabilidad();
  }

  actualizarVariable(hab: Habilidad): void{
    this.habilidad =  hab;

  }

  delete(id: number){
    if(id != undefined){
      this.sHabilidad.delete(id).subscribe(
        bd =>{
        //alerta que la habilidad ha sido eliminada
        alert("No se pudo eliminar la habilidad");
        //alert("Habilidad eliminada");
        this.cargarHabilidad();
    //
    }, error =>{
      alert("Habilidad eliminada");
      this.cargarHabilidad()
      //window.location.reload();
      //alert("No se pudo eliminar la habilidad");
    })
  }
  }

}
/*
, err =>{
  alert("No se pudo eliminar la habilidad");
}*/
