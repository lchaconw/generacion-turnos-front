import { Servicio } from "./Servicio";

export interface Turno {
  id: number;
  servicio: Servicio;
  fechaTurno: Date;
  horaInicio: Date;
  horaFin: Date;
  estado: string;
}
