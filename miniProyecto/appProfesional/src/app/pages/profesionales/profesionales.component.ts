import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfesionalService } from 'src/shared/servicio.service';
import { Profesional } from 'src/model/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit, OnDestroy {
  mostrarFormulario: FormGroup; // Aquí solo se declara el FormGroup, no se inicializa aún.
  agregarFormulario: FormGroup;
  profesionales: Profesional[] = [];
  mostrarError: boolean = false; 
  profesionalSeleccionado: Profesional | null = null;
  profesionalesSuscripcion: Subscription | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private profesionalService: ProfesionalService
  ) {
    // Inicializa el FormGroup aquí usando el constructor de FormBuilder
    this.mostrarFormulario = this.formBuilder.group({
      nombre: '',
      apellido: ''
    });

    this.agregarFormulario = this.formBuilder.group({
      nombre: '',
      apellido: '',
      titulo: '',
      experiencia: '',
      habilidades: '',
      educacion: ''
    });
  }

  ngOnInit() {
    // Aquí ya se inicializó el FormGroup en el constructor, así que puedes usarlo directamente.
    this.mostrarFormulario.setValue({
      nombre: '',
      apellido: ''
    });

    this.agregarFormulario.setValue({
      nombre: '',
      apellido: '',
      titulo: '',
      experiencia: null,
      habilidades: '',
      educacion: ''
    });
  }

 

  ngOnDestroy() {
    this.profesionalesSuscripcion?.unsubscribe();
  }


   buscarProfesionales() {
    const nombre = this.mostrarFormulario.get('nombre')?.value;
    const apellido = this.mostrarFormulario.get('apellido')?.value;

    this.profesionalesSuscripcion?.unsubscribe();

    if (nombre && apellido) {
      this.profesionalesSuscripcion = this.profesionalService.getProfesionalPorNombreApellido(nombre, apellido)
        .subscribe({
          next: (data: Profesional[]) => {
            this.profesionales = data;
            this.mostrarError = data.length === 0;
            this.profesionalSeleccionado = null;
          },
          error: (error: any) => {
            console.log('Error al obtener el profesional', error);
          }
        });
    } else {
      this.profesionalesSuscripcion = this.profesionalService.getProfesionales()
        .subscribe({
          next: (data: Profesional[]) => {
            this.profesionales = data;
            this.mostrarError = data.length === 0;
          },
          error: (error: any) => {
            console.log('Error al obtener los profesionales', error);
          }
        });
    }
  }

  
  
  crearProfesional() {
    const nuevoProfesional: Profesional = {
      nombre: this.agregarFormulario.value.nombre.trim(),
      apellido: this.agregarFormulario.value.apellido.trim(),
      titulo: this.agregarFormulario.value.titulo.trim(),
      experiencia: this.agregarFormulario.value.experiencia,
      habilidades: this.agregarFormulario.value.habilidades.split(',').map((habilidad: string) => habilidad.trim()),
      educacion: this.agregarFormulario.value.educacion.trim()
    };
  
    this.profesionalService.crearProfesional(nuevoProfesional)
      .subscribe((data: Profesional) => {
        this.profesionales.unshift(data);
        this.agregarFormulario.reset();
        this.profesionales = [...this.profesionales]; // Actualizar la referencia del array para que se refleje en la vista
      });
  }
  
  actualizarProfesional(profesional: Profesional) {
  const profesionalActualizado: Profesional = {
    nombre: profesional.nombre,
    apellido: profesional.apellido,
    titulo: this.agregarFormulario.value.titulo.trim(),
    experiencia: this.agregarFormulario.value.experiencia,
    habilidades: this.agregarFormulario.value.habilidades.split(',').map((habilidad: string) => habilidad.trim()),
    educacion: this.agregarFormulario.value.educacion.trim()
  };

  profesional.titulo = profesionalActualizado.titulo;
  profesional.experiencia = profesionalActualizado.experiencia;
  profesional.habilidades = profesionalActualizado.habilidades;
  profesional.educacion = profesionalActualizado.educacion;

  this.profesionales = [...this.profesionales];
  
  
  this.profesionalService.actualizarProfesional(profesional.nombre, profesionalActualizado)
    .subscribe((data: Profesional) => {
     
    });
}


  eliminarProfesional(profesional: Profesional) {
    this.profesionalService.eliminarProfesional(profesional.nombre)
      .subscribe(() => {
        const index = this.profesionales.indexOf(profesional);
        if (index !== -1) {
          this.profesionales.splice(index, 1);
        }
      });
  }
  
}
