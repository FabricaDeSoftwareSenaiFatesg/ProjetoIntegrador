
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'coluna-opcoes',
    template: `

            <a (click)="editar($event)" pTooltip="Editar" tooltipPosition="left" class="btn-tabela" *ngIf="showEditar">

                <i class="pi pi-pencil"></i>

            </a>

            <a (click)="visualizar($event)" pTooltip="Visualizar" tooltipPosition="left" class="btn-tabela" *ngIf="showVisualizar && !comunicado">

                <i class="pi pi-eye"></i>

            </a>

            <a (click)="excluir($event)" pTooltip="Excluir" tooltipPosition="left" class="btn-tabela" *ngIf="showExcluir">

                <i class="pi pi-trash"></i>

            </a>

            <a (click)="status($event)" pTooltip="Ativar" tooltipPosition="left" class="btn-tabela" *ngIf="!ativo && showStatus">

                <i class="pi pi-check"></i>

            </a>

            <a (click)="status($event)" pTooltip="Inativar" tooltipPosition="left" class="btn-tabela" *ngIf="ativo && showStatus">

                <i class="pi pi-times"></i>

            </a>

    `
})
export class ColunaOpcoesComponent {

    @Input() ativo: boolean

    @Input() comunicado: boolean

    @Input() showEditar: boolean = true

    @Input() showVisualizar: boolean = true

    @Input() showExcluir: boolean = true

    @Input() showStatus: boolean = true

    @Output() onEditar = new EventEmitter<string>();

    @Output() onVisualizar = new EventEmitter<string>();

    @Output() onExcluir = new EventEmitter<string>();

    @Output() onStatus = new EventEmitter<string>();

    constructor(protected router: Router, protected activatedRoute:ActivatedRoute) {

    }

    editar(event?: any) {
      this.onEditar.emit('')
    }

    visualizar(event?: any) {
      this.onVisualizar.emit('')
    }

    excluir(event?: any) {
      this.onExcluir.emit('')
    }

    status(event?: any) {
      this.onStatus.emit('')
    }

}
