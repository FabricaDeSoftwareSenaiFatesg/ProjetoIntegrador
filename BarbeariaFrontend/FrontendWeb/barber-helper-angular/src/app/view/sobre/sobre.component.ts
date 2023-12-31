import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent {

  constructor(private router: Router) { }

  public redirecionarParaAgendamento(rota: string): void {
    this.router.navigateByUrl(rota);
  }

}
