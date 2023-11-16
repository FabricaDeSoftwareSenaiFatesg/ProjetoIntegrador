import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

interface IconFlips {
  isCorteFlipped: boolean;
  isBarbaFlipped: boolean;
  isHidratacaoFlipped: boolean;
  isSelagemFlipped: boolean;
}

interface Servico {
  nome: string;
  valor: string;
}

interface Profissional {
  nome: string;
  imagem: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  selectedService: any;

  iconFlips: IconFlips = {
    isCorteFlipped: false,
    isBarbaFlipped: false,
    isHidratacaoFlipped: false,
    isSelagemFlipped: false,
  };

  servicos: Servico[] = [
    { nome: 'Corte', valor: 'R$ 30,00' },
    { nome: 'Barba', valor: 'R$ 25,00' },
    { nome: 'Hidratação', valor: 'R$ 40,00' },
    { nome: 'Selagem', valor: 'R$ 50,00' },
  ];

  flipBox(icon: keyof IconFlips) {
    this.iconFlips[icon] = !this.iconFlips[icon];
  }

  diasSemana: string[] = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  horariosAtendimento: string[] = [
    'Fechado',
    '08:00 às 18:00',
    '08:00 às 18:00',
    '08:00 às 18:00',
    '08:00 às 18:00',
    '08:00 às 18:00',
    '08:00 às 16:00',
  ];

  profissionais: Profissional[] = [
    { nome: '1', imagem: '/assets/images/avatar.png' },
    { nome: '2', imagem: '/assets/images/avatar.png' },
    { nome: '3', imagem: '/assets/images/avatar.png' },
    { nome: '4', imagem: '/assets/images/avatar.png' },
  ];

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {}

  openEndMenu() {
    console.log('Botão clicado. Tentando abrir o menu.');
    this.menuCtrl.open('end');
  }
  
}
