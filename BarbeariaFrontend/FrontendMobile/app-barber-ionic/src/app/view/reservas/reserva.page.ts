import { Component } from '@angular/core';

@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage {

  listaAgendamentos: any[] = [];

  constructor() {}

  ngOnInit() {
    
  }

  reservar() {

  }

}

class Reserva {

  data: Date = new Date();
  valor: number = 0;
  servico: string = "";
  horaInicio: string = "";
  horaFim: string = "";
  profissional: string = "";

}
