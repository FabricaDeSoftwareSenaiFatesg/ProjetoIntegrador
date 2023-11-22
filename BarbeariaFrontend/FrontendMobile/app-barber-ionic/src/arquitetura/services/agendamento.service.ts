import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {ReservaModel} from "../modelo/reserva.model";
import {FiltroHorarios} from "../modelo/filtro-horarios.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService extends BaseService<ReservaModel>{

  constructor(httpClient: HttpClient) {
    super(httpClient, "reserva");
  }

  consultarHorarios(filtro: FiltroHorarios): Observable<any> {
    return this.http.post<any>(`${this.url}/${this.path}/consultarHorarios`, filtro);
  }

  salvarReserva(reserva: ReservaModel) {
    return this.http.post<ReservaModel>(`${this.url}/${this.path}/salvarReserva`, reserva);
  }
}
