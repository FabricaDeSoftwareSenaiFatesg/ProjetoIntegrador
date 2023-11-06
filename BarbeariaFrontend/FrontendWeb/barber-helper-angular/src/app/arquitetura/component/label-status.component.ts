
import { Component, Input } from "@angular/core";

@Component({
    selector: 'label-status',
    template: `
        <label class="{{ativo ? 'label-status label-status-ativo' : 'label-status label-status-inativo'}}">{{ ativo ? 'ATIVO' : 'INATIVO' }}</label>
    `,
    styles: [
        `.label-status {
            color: #fff;
            font-size: 7pt;
            padding: 2px;
            min-width: 50px;
        }

        .label-status-ativo {
            background-color: #28a745;
            border-color: #28a745;
            border-radius: 4px;
        }

        .label-status-inativo {
            background-color: #dc3545;
            border-color: #dc3545;
            border-radius: 4px;
        }`
    ]
})
export class LabelStatusComponent {

    @Input() ativo: boolean = true;

}
