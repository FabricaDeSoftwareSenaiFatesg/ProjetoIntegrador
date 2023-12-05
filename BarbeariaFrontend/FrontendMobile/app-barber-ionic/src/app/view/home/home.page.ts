import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MenuController, LoadingController, NavController} from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import {UsuarioService} from "../../../arquitetura/services/usuario.service";
import { Imagem } from 'src/arquitetura/modelo/imagem.model';
import { Pessoa } from 'src/arquitetura/modelo/pessoa.model';
import { PessoaService } from 'src/arquitetura/services/pessoa.service';

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
  responsiveOptions: any[] | undefined

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

  profissionais: Pessoa[] = [];

  constructor(
    private menuCtrl: MenuController,
    public loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private pessoaService: PessoaService,
    private navigation: NavController
  ) {}

  async ngOnInit() {
    await this.presentLoading();

    setTimeout(() => {
      this.createMap();
      this.dismissLoading();
    }, 1000);

    this.inicializarProfissionais();

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];
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

  deslogar() {
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

  obterConteudoFormatado(imagem?: Imagem) {

    if (imagem) {

      return 'data:' + imagem.tipo + ';base64,' + imagem.conteudo;

    } else {

      return '/assets/images/avatar.png';

    }

  }

  inicializarProfissionais() {
    this.pessoaService.listarProfissionais().subscribe(response => {
      this.profissionais = response;
    });
  }

}
