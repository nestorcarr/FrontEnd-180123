import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/model/banner';
//Importo el servicio
//import { InfoService } from '../../../service/info/info.service';
import { BannerService } from 'src/app/service/banner.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  //[x: string]: any;
  api ="banner/ver"
//Inicializo y Creo la variable de instancia para almacenar los datos que trata el servicio
carousel: Banner[] = [];//any=[];
banner : Banner = {
  id: 0,
  carouselimag: "",
  carouselimage: "",
  carouselimagen: "",
  imageprincipal: ""
 };
/*carousel: any=[];
carouselimag: any="";
carouselimage: any="";
carouselimagen: any="";
*/
  constructor(
//Inyectar el Servicio para tener acceso en la Clase a los Metodos
    //private infoService: InfoService,
    private sBanner: BannerService,
    //private tokenService: TokenService
  ) { }

  IsLogged = false;

  ngOnInit() {
    //Esto es para almacenar en la variable de instancia los datos recuperados por el servicio?
    this.cargarBanner();
  }
  cargarBanner():void {
    this.sBanner.lista().subscribe(bd => {
      this.carousel = bd
  });
  }

}
