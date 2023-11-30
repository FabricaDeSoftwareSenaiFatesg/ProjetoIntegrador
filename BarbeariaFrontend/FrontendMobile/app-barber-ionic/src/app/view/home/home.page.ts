import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MenuController, LoadingController, NavController} from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import {UsuarioService} from "../../../arquitetura/services/usuario.service";

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
export class HomePage implements OnInit {
  @ViewChild('map', { static: false })
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

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

  constructor(
    private menuCtrl: MenuController,
    public loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private navigation: NavController
  ) {}

  async ngOnInit() {
    await this.presentLoading();

    setTimeout(() => {
      this.createMap();
      this.dismissLoading();
    }, 1000);
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyDrIrQf7mX8URp_eOcybLO_URWe9MyJ3JU',
      config: {
        center: {
          lat: -16.69164276123047,
          lng: -49.324623107910156,
        },
        zoom: 12,
      },
    });
  }

  flipBox(icon: keyof IconFlips) {
    this.iconFlips[icon] = !this.iconFlips[icon];
  }

  openEndMenu() {
    console.log('Botão clicado. Tentando abrir o menu.');
    this.usuarioService.logout().subscribe(() => {
      if (localStorage.getItem("ads_access_token") !== null) {
        localStorage.removeItem("ads_access_token");
      }
      this.navigation.navigateRoot("login");
    });
    this.menuCtrl.open('end');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
      translucent: true
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}
