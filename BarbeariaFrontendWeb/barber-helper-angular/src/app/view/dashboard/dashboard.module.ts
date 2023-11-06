import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ArquiteturaModule} from "../../arquitetura/arquitetura.module";
import {DashboardComponent} from "./dashboard.component";
import {ChartModule} from "primeng/chart";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule,
    ChartModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {

}
