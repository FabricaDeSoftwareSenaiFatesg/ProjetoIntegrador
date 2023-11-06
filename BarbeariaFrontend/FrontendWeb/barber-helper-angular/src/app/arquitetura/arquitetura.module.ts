import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SafeUrlPipe } from './pipe/safe-url.pipe';
import { ImagemPreviewComponent } from './component/imagem-preview.component';
import { ColunaOpcoesComponent } from './component/coluna-opcoes.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { LabelStatusComponent } from './component/label-status.component';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    SafeUrlPipe,
    ImagemPreviewComponent,
    ColunaOpcoesComponent,
    LabelStatusComponent
  ],
  imports: [
    CommonModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    InputSwitchModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    TieredMenuModule,
    DialogModule,
    InputNumberModule,
    ConfirmPopupModule,
    DataViewModule,
    CardModule,
    SidebarModule,
    ScrollPanelModule,
    DividerModule,
    MessagesModule,
    TooltipModule,
    PasswordModule
  ],
  exports: [
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    InputSwitchModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    TieredMenuModule,
    DialogModule,
    InputNumberModule,
    SafeUrlPipe,
    ImagemPreviewComponent,
    ColunaOpcoesComponent,
    ConfirmPopupModule,
    DataViewModule,
    DataViewLayoutOptions,
    LabelStatusComponent,
    CardModule,
    SidebarModule,
    ScrollPanelModule,
    DividerModule,
    MessagesModule,
    TooltipModule,
    PasswordModule
  ],
  providers: [
    SafeUrlPipe
  ]
})
export class ArquiteturaModule { }
