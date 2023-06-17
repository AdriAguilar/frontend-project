import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  formulario: FormGroup;
  aceptarDerechos: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      aceptar: [false, Validators.requiredTrue],
      archivos: [null]
    });
  }

  notValid( field: string ) {
    return this.formulario.controls[ field ].errors
        && this.formulario.controls[ field ].touched;
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // Aquí puedes agregar la lógica para enviar el formulario
    console.log(this.formulario.value);

    // Limpia el formulario después de enviarlo
    this.formulario.reset();
  }

  onArchivoSeleccionado(event: any) {
    if (event.target.files.length > 0) {
      const archivo = event.target.files[0];
      this.formulario.get('archivos').setValue(archivo);
    }
  }
}
