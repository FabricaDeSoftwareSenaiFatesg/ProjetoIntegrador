import {Injectable} from '@angular/core';
import {BaseService} from "../../arquitetura/service/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService<any>{

  constructor(httpClient: HttpClient) {
    super( httpClient, 'dashboard');
  }

  listarDashboardDTO(){
    return this.httpClient.get<any>(`${this.API}/${this.path}/valores-dashboard`);
  }

}
