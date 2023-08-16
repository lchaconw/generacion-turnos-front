import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GeneracionTurnosService } from '../services/generacion-turnos.service';
import { Comercio } from '../models/Comercio';
import { Servicio } from '../models/Servicio';
import { Turno } from '../models/Turnos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-turnos',
  templateUrl: './generar-turnos.component.html',
  styleUrls: ['./generar-turnos.component.css']
})
export class GenerarTurnosComponent implements OnInit {

  public form: FormGroup;

  comercios: Comercio[] = [];
  servicios: Servicio[] = [];
  turnos: Turno[] = [];
  displayedTurnos: Turno[] = [];

  itemsPerPage = 10;
  totalItems: number = 0;
  currentPage = 1;
  Math = Math;

  constructor(public authService: AuthService, private generacionTurnosService: GeneracionTurnosService, private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedComercio: ['', Validators.required],
      selectedServicio: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getComercios();
    this.getTurnos();
  }

  getComercios() {
    this.generacionTurnosService.getComercios().subscribe({
      next: (data: Comercio[]) => {
        this.comercios = data;
      },
      error: error => {
        console.error('Error fetching comercios:', error);
      }
    }
    );
  }

  getServicios() {
    this.form.setValue({
      ...this.form.value,
      selectedServicio: ''
    });

    if (this.form.value.selectedComercio == '') { return; }
    this.generacionTurnosService.getServiciosPorComercio(this.form.value.selectedComercio).subscribe({
      next: (data: Servicio[]) => {
        this.servicios = data;
      },
      error: error => {
        console.error('Error fetching servicios:', error);
      }
    }
    );
  }

  getTurnos() {
    this.generacionTurnosService.getTurnos().subscribe({
      next: (data: Turno[]) => {
        this.turnos = data;
        this.totalItems = this.turnos.length;
        this.pageChanged({ page: this.currentPage });
      },
      error: error => {
        console.error('Error fetching turnos:', error);
      }
    }
    );
  }

  generarTurnos(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos!'
      });
      return;
    }

    //fecha desde debe ser menor fecha hasta
    if (this.form.value.fechaInicial > this.form.value.fechaFinal) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha desde debe ser menor a la fecha hasta'
      });
      return;
    }

    // this.generacionTurnosService.postGenerarTurnos(this.comercio, this.servicio, this.fechaInicial, this.fechaFinal).subscribe({
    this.generacionTurnosService.postGenerarTurnos(this.form.value.selectedServicio, this.form.value.fechaInicial, this.form.value.fechaFinal).subscribe({
      next: (data: Turno[]) => {
        this.turnos = data;
        this.totalItems = this.turnos.length;
        this.pageChanged({ page: this.currentPage });
        Swal.fire({
          icon: 'success',
          title: 'Turnos generados con éxito!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: error => {
        console.error('Error fetching post generar turnos:', error.error.error);
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.error
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al generar turnos!'
          });
        }
      }
    });
  }

  pageChanged(event: any): void {
    const startItem = (event.page - 1) * this.itemsPerPage;
    const endItem = event.page * this.itemsPerPage;
    this.displayedTurnos = this.turnos.slice(startItem, endItem);
  }
}
