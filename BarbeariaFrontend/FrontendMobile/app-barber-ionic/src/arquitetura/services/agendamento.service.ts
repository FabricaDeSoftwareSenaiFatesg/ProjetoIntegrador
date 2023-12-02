import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {ReservaModel} from "../modelo/reserva.model";
import {FiltroHorarios} from "../modelo/filtro-horarios.model";
import {Observable} from "rxjs";
import {StatusReservaEnum} from "../modelo/enum/status-reserva.enum";
import {FiltroReservasProfissional} from "../modelo/filtro-reservas-profissional";
import {ReservaListagemModel} from "../modelo/reserva-listagem.model";

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

  listarReservasPorCliente(idCliente: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${this.path}/listarReservasPorCliente/${idCliente}`);
  }

  listarReservasPorProfissional(filtro: FiltroReservasProfissional): Observable<ReservaListagemModel[]> {
    return this.http.post<ReservaListagemModel[]>(`${this.url}/${this.path}/listarReservasPorProfissional`, filtro);
  }

  cancelarReserva(id: number) {
    return this.http.put(`${this.url}/${this.path}/cancelarReserva/${id}`, null);
  }

  executarReserva(id: number) {
    return this.http.put(`${this.url}/${this.path}/executarReserva/${id}`, null);
  }
}
