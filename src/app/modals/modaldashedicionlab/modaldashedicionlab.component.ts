import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//Importamos las librerias de formulario que vamos a utilizar
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Laboral } from 'src/app/model/laboral';
import { LaboralService } from 'src/app/service/laboral.service';

@Component({
  selector: 'app-modaldashedicionlab',
  templateUrl: './modaldashedicionlab.component.html',
  styleUrls: ['./modaldashedicionlab.component.scss']
})
export class ModaldashedicionlabComponent implements OnInit {
  form!: FormGroup;
  //traba: Laboral = {id: 1, empresa: "", logo: "", cargo: "", inicio: "", finalizacion: "", tareas: ""};
  //laboralId: number = 1; //Inicializo en  id fijo = 1
  //id: number = 1; //le pongo id fijo
  //Para enviar la funcion al componente padre
  @Output() actualizarComponente  = new EventEmitter<any>;
  @Input() editarLaboral : Laboral = {
    id: 0,
    empresa: "",
    logo: "",
    cargo: "",
    inicio: "",
    finalizacion: "",
    tareas: ""
  };


  //Inyectar en el constructor el formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private sLaboral: LaboralService,
    private router: Router
  ) {
    this.form=this.formBuilder.group({
        id:[''],
        empresa: ['', [Validators.required]],
        logo: ['', [Validators.required]],
        cargo: ['', [Validators.required]],
        inicio: ['', [Validators.required]],
        finalizacion: ['', [Validators.required]],
        tareas: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
  /**/
  }

  ngOnChanges(): void {
    this.form.controls['id']?.setValue(this.editarLaboral.id);
    this.form.controls['empresa']?.setValue(this.editarLaboral.empresa);
    this.form.controls['logo']?.setValue(this.editarLaboral.logo);
    this.form.controls['cargo']?.setValue(this.editarLaboral.cargo);
    this.form.controls['inicio']?.setValue(this.editarLaboral.inicio);
    this.form.controls['finalizacion']?.setValue(this.editarLaboral.finalizacion);
    this.form.controls['tareas']?.setValue(this.editarLaboral.tareas);
}

  get Empresa(){
    return this.form.get('empresa');
  }
  get Logo(){
    return this.form.get('logo');
  }
  get Cargo(){
    return this.form.get('cargo');
  }
  get Inicio(){
    return this.form.get('inicio');
  }
  get Finalizacion(){
    return this.form.get('finalizacion');
  }
  get Tareas(){
    return this.form.get('tareas');
  }

  onUpdate(): void{
    this.sLaboral.save(this.form.value).subscribe(
      data => {
        document.getElementById('cerrarModalEdicionLaboral').click();
        alert("Error en la modificacion, intentelo nuevanente");
        this.actualizarComponente.emit();
        this.router.navigate(['/dashboard']);
        }, err =>{
        alert("la informacion fue modificada");
        this.router.navigate(['/dashboard']);
        this.actualizarComponente.emit();
        document.getElementById('cerrarModalEdicionLaboral').click();
      }
    )

  }

}
