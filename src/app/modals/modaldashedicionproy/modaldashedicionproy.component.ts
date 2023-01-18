import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//Importamos las librerias de formulario que vamos a utilizar
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-modaldashedicionproy',
  templateUrl: './modaldashedicionproy.component.html',
  styleUrls: ['./modaldashedicionproy.component.scss']
})
export class ModaldashedicionproyComponent implements OnInit {
  form!: FormGroup;
  //proye: Proyecto = {id: 1, institucion: "", proyecto: "", profesion: "", logoproyecto: "", tema: "", temauno: "", anio: "", estado: ""};
  //proyectoId: number = 1; //Inicializo en  id fijo = 1
  //id: number = 1; //le pongo id fijo
  @Output() actualizarComponente  = new EventEmitter<any>;
  @Input() editarProyecto : Proyecto = {
    id: 0,
    institucion: "",
    proyecto: "",
    profesion: "",
    logoproyecto: "",
    tema: "",
    temauno: "",
    anio: "",
    estado: ""

  };

  ngOnInit() : void {}
   //Inyectar en el constructor el formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private sProyecto: ProyectoService,
    //private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form=this.formBuilder.group({
      id:[''],
      institucion: ['', [Validators.required]],
      proyecto: ['', [Validators.required]],
      profesion: ['', [Validators.required]],
      logoproyecto: ['', [Validators.required]],
      tema: ['', [Validators.required]],
      temauno: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      estado: ['', [Validators.required]],

    })

  }

  ngOnChanges(): void {
      this.form.controls['id']?.setValue(this.editarProyecto.id);
      this.form.controls['institucion']?.setValue(this.editarProyecto.institucion);
      this.form.controls['proyecto']?.setValue(this.editarProyecto.proyecto);
      this.form.controls['profesion']?.setValue(this.editarProyecto.profesion);
      this.form.controls['anio']?.setValue(this.editarProyecto.anio);
      this.form.controls['tema']?.setValue(this.editarProyecto.tema);
      this.form.controls['temauno']?.setValue(this.editarProyecto.temauno);
      this.form.controls['estado']?.setValue(this.editarProyecto.estado);
      this.form.controls['logoproyecto']?.setValue(this.editarProyecto.logoproyecto);
  }

  get Institucion(){
    return this.form.get('institucion');
  }
  get Proyecto(){
    return this.form.get('proyecto');
  }
  get Profesion(){
    return this.form.get('profesion');
  }
  get Logoproyecto(){
    return this.form.get('logoproyecto');
  }
  get Tema(){
    return this.form.get('tema');
  }
  get Temauno(){
    return this.form.get('temauno');
  }
  get Anio(){
    return this.form.get('anio');
  }
  get Estado(){
    return this.form.get('estado');
  }

  onUpdate(): void{
    this.sProyecto.save(this.form.value).subscribe(
      data => {
        //alert("error");
        document.getElementById('cerrarModalEdicionProyecto').click();
        //alert("la informacion fue modificada");
        alert("Error en la modificacion, intentelo nuevanente");
        this.actualizarComponente.emit();
        this.router.navigate(['/dashboard']);
        }, err =>{
        alert("la informacion fue modificada");
        this.router.navigate(['/dashboard']);
        this.actualizarComponente.emit();
        document.getElementById('cerrarModalEdicionProyecto').click();
      }
    )


  }
  limpiar(): void {
    this.form.reset();
  }

}

