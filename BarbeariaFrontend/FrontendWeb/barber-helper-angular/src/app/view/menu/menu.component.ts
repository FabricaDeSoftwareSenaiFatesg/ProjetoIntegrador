import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/arquitetura/modelo/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: UsuarioService
  ) {}

  itens: MenuItem[];
  itensMenuSanduiche: MenuItem[];

  usuarioLogado: Usuario;
  usuarioLogadoTemAtribuicao: boolean = true;

  ngOnInit() {
    this.inicializarUsuario();
    this.inicializarItemsMenuSanduiche();
  }

  verificaUsuarioPopulado() {
    return this.usuarioLogado != undefined ? true : false;
  }

  inicializarUsuario() {
    this.service.getUsuarioLogado().subscribe(retorno => {
      this.usuarioLogado = retorno;

      this.service.usuarioTemAtribuicao().subscribe( retorno => {
        this.usuarioLogadoTemAtribuicao = retorno;
        this.inicializarItemsMenuPadrao();
      });

    });
  }

  inicializarItemsMenuPadrao(){

    this.itens = [
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        command:(click)=>{this.router.navigate(['perfil']);}
      },
    ];

    if (this.usuarioLogadoTemAtribuicao){
      this.adicionarComponentesAdminOuFuncionario();
    }

    this.adicionarLogoutNosItems();
  }

  adicionarComponentesAdminOuFuncionario(){
    this.itens.push(
      {
        label: 'Reservas',
        icon: 'pi pi-fw pi-calendar',
        command:(click)=>{this.router.navigate(['reserva']);}
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-line',
        command:(click)=>{this.router.navigate(['dashboard']);}
      },
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Serviços',
            icon: 'pi pi-fw pi-wrench',
            command:(click)=>{this.router.navigate(['servico']);}
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            command:(click)=>{this.router.navigate(['usuario']);}
          },
          {
            label: 'Produtos',
            icon: 'pi pi-fw pi-box',
            command:(click)=>{this.router.navigate(['produto']);}
          }
        ]
      }
    )
  }

  adicionarLogoutNosItems(){
    this.itens.push(
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-power-off',
        command:(click)=>{this.logout();}
      }
    )
  }

  inicializarItemsMenuSanduiche(){
    this.itensMenuSanduiche = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command:(click)=>{this.router.navigate(['']);}
      },
      {
        label: 'Sobre',
        icon: 'pi pi-info-circle',
        command:(click)=>{this.router.navigate(['sobre']);}
      },
      {
        label: 'Serviços',
        icon: 'pi pi-briefcase',
        command:(click)=>{this.router.navigate(['servicos']);}
      },
      {
        label: 'Loja',
        icon: 'pi pi-shopping-cart',
        command:(click)=>{this.router.navigate(['loja']);}
      },
      {
        label: 'Agendar',
        icon: 'pi pi-calendar-times',
        command:(click)=>{this.router.navigate(['reserva']);}
      },
    ];
  }

  logout() {
    this.service.logout().subscribe(() => {
      if(localStorage.getItem("ads_access_token") !== null){
        localStorage.removeItem("ads_access_token");
      }
      this.router.navigate(['']);
      this.ngOnInit();
    });
  }

}
