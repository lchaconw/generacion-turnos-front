import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turno } from '../models/Turnos';
import { Observable } from 'rxjs';
import { Comercio } from '../models/Comercio';
import { Servicio } from '../models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class GeneracionTurnosService {

  private apiUrl = 'http://localhost:8080/api/agendamiento';

  constructor(private http: HttpClient) { }

  postGenerarTurnos(idServicio: string, fechaInicio: string, fechaFin: string): Observable<Turno[]> {
    return this.http.post<Turno[]>(this.apiUrl + "/generarTurnos", { idServicio, fechaInicio, fechaFin });
  }

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl + "/turnos");
  }

  getComercios(): Observable<Comercio[]> {
    return this.http.get<Comercio[]>(this.apiUrl + "/comercios");
  }

  getServiciosPorComercio(idComercio : string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl + "/servicios" + "/" + idComercio);
  }
}
