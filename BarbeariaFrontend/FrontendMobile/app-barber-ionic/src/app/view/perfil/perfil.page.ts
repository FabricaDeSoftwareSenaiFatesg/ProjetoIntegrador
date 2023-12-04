import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Capacitor} from '@capacitor/core';
import {UsuarioService} from "../../../arquitetura/services/usuario.service";
import {UsuarioModel} from "../../../arquitetura/modelo/usuario.model";
import {AgendamentoService} from "../../../arquitetura/services/agendamento.service";
import {FiltroReservas} from "../../../arquitetura/modelo/filtro-reservas";
import {ReservaListagemModel} from "../../../arquitetura/modelo/reserva-listagem.model";
import {TipoUsuarioEnum} from "../../../arquitetura/modelo/enum/tipo-usuario.enum";

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private agendamentoService: AgendamentoService
  ) {}

  filtroReservas: FiltroReservas = new FiltroReservas();
  usuarioLogado!: UsuarioModel;
  quantidadeMaximaReservas = 8;
  visualizar = true;
  reservasPerfil: ReservaListagemModel[] = [];
  dataSelecionada!: string;
  selectedImage: any;
  funcionario: boolean = false;

  ngOnInit() {
    this.consultarUsuarioLogado();
  }

  consultarUsuarioLogado() {
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.usuarioLogado = response;
      this.funcionario = this.usuarioLogado.tipo === TipoUsuarioEnum.FUNCIONARIO;
    });
  }

  editar() {
    this.visualizar = !this.visualizar;
  }

  salvar() {
    this.usuarioService.alterar(this.usuarioLogado).subscribe();
    this.visualizar = !this.visualizar;
  }

  consultarHistorico() {
    this.filtroReservas.id = this.usuarioLogado.pessoa.id;
    this.filtroReservas.data = this.dataSelecionada;

    this.agendamentoService.listarReservasPeloMes(this.filtroReservas).subscribe(response => {
      this.reservasPerfil = response;
    });
  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    this.selectedImage = image;
    if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;

    console.log(image)
  }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() == 'ios') return true;
    return false;
  }

  converterImagemSelecionada() {

    if (!this.selectedImage) {

      let imagemSelecionada = new Imagem();

      imagemSelecionada.nome = "Imagem perfil";

      imagemSelecionada.conteudo = this.selectedImage.dataUrl?.slice(this.selectedImage.dataUrl?.indexOf(';base64,'));

      imagemSelecionada.tipo = this.selectedImage.dataUrl?.slice((this.selectedImage.dataUrl?.indexOf(':') -1), this.selectedImage.dataUrl?.indexOf(';base64,'));

    }

  }

}
