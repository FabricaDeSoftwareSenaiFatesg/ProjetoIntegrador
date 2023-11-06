import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/arquitetura/modelo/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { TipoUsuarioEnum } from 'src/app/arquitetura/modelo/tipo-usuario.enum';
import { ReservaService } from '../reserva/reserva.service';
import { PerfilDTO } from 'src/app/arquitetura/modelo/perfilDTO.model';
import { StatusReservaEnum } from 'src/app/arquitetura/modelo/status-reserva.enum';
import { StatusPedidoEnum } from 'src/app/arquitetura/modelo/status-pedido.enum';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected usuarioService: UsuarioService,
    protected reservaService: ReservaService
  ) {}

  usuarioLogado: Usuario;

  perfilUsuario: PerfilDTO;

  ngOnInit() {

    this.pegarDadosUsuario();

  }

  pegarDadosUsuario() {

    this.usuarioService.getUsuarioLogado().subscribe(retorno => {

      this.usuarioLogado = retorno;

      this.reservaService.consultarDadosPerfil(this.usuarioLogado.pessoa.id).subscribe(retorno => {

        this.perfilUsuario = retorno;

      });

    });

  }

  formatarEnumReserva(statusEnumReserva: StatusReservaEnum) {

    if (statusEnumReserva.toString()  == "FINALIZADO") return "Finalizado";

    else if (statusEnumReserva.toString()  == "CANCELADO") return "Cancelado";

    else return "Reservado";

  }

  formatarEnumPedido(statusEnumPedido: StatusPedidoEnum) {

    if (statusEnumPedido.toString() == "EM_ESPERA") return "Em Espera";

    else if (statusEnumPedido.toString() == "FINALIZADO") return "Finalizado";

    else return "Negado";

  }

  logout() {
    this.usuarioService.logout().subscribe(() => {
      if(localStorage.getItem("ads_access_token") !== null){
        localStorage.removeItem("ads_access_token");
      }
      this.router.navigate(['']);
      this.ngOnInit();
    });
  }

}
