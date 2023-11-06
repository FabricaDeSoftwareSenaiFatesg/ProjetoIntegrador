
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Imagem } from "../modelo/imagem.model";

@Component({
    selector: 'imagem-preview',
    template: `

        <div class="form-row" style="margin-left: 0px !important; border: solid 1px #CCCCCC; border-radius: 5px; min-height: 82%; display: block;">

            <div *ngIf="!visualizacao" class="form-row" style="min-width: 100%; margin: 0px 0px -15px 0px; max-height: 35px;">

                <div class="col-md" style="text-align: end">

                    <a (click)="removerImagem()" class="btn" pTooltip="Remover Imagem" tooltipPosition="left" style="color: #6c757d;">

                        <i class="pi pi-trash"></i>

                    </a>

                    <a class="btn" pTooltip="Selecionar Imagem" tooltipPosition="left" style="color: #ffc107">

                        <input type="file" (change)="readAndPreviewImagem($event)" class="custom-file-input" style="position: absolute; font-size: 0; margin-left: -11px; margin-top: -7px; max-width: 40px; cursor: pointer; opacity: 0;"/>

                        <i class="pi pi-upload"></i>

                    </a>

                </div>

            </div>

            <div class="form-row height-min-155" style="width: 100%; margin: 0px !important; min-height: 150px;">

                <div class="col-md text-center {{visualizacao && (!entidade || !entidade.imagem) ? 'pd-top-20' : 'pd-top-5'}}">

                    <img [src]="obterConteudoFormatado()" *ngIf="entidade && entidade.imagem" style="max-width: 100%;" />

                    <span *ngIf="!entidade || !entidade.imagem || !entidade.imagem.conteudo" class="center" style="top: 60%;">

                        <i class="{{icon}}" style="font-size: 5em;color: #ced4da;"></i>

                    </span>

                </div>

            </div>

        </div>

        `
})
export class ImagemPreviewComponent {

  @Input() visualizacao: boolean = false

  @Input() entidade: any

  @Input() icon: any

  @Input() maxLength: number = 154181;

  constructor() {

  }

  readAndPreviewImagem(event: any) {

    let files = event.srcElement ? event.srcElement.files : event.target ? event.target.files : undefined

    for (let i = 0, f:any; f = files[i]; i++) {

      var extensao = f.type.toLowerCase();

      if (extensao.match('image.*') && (extensao.match('jpg.*') || extensao.match('png.*') || extensao.match('jpeg.*')) && f.size <= this.maxLength) {

        let reader = new FileReader();

        reader.onloadend = (e) => {

          if (reader.readyState === FileReader.DONE) {

            this.entidade.imagem = new Imagem()

            this.entidade.imagem.nome = f.name

            this.entidade.imagem.tamanho = f.size

            this.entidade.imagem.tipo = f.type

            if (reader.result !== null && reader.result !== undefined) {

              this.entidade.imagem.conteudo = reader.result.toString().substring(reader.result.toString().indexOf('base64,') + 7, reader.result.toString().length);

              var img = new Image();

              img.src = reader.result.toString();

              img.onload = (e) => {

                this.entidade.imagem.dimensoes = img.width + 'x' + img.height;

              }

            }

          }

        }

        reader.readAsDataURL(f);

      }

    }

  }

  removerImagem(): void {

    this.entidade.imagem = undefined

  }

  obterConteudoFormatado() {

    if (this.entidade.imagem.conteudo.indexOf('base64,') > -1) {

        return this.entidade.imagem.conteudo

    } else {

        return 'data:' + this.entidade.imagem.tipo + ';base64,' + this.entidade.imagem.conteudo

    }

  }

}
