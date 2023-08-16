import { Comercio } from "./Comercio";

export interface Servicio {
  id: number;
  comercio: Comercio;
  nombre: string;
  horaApertura: string;
  horaCierre: string;
  duracion: number;
}
