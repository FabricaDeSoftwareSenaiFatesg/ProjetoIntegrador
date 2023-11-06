import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  horarios: String[] = [];

  responsiveOptions: any[] | undefined;

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {

    this.horarios = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",];

    // this.responsiveOptions = [
    //   {
    //       breakpoint: '1199px',
    //       numVisible: 1,
    //       numScroll: 1
    //   },
    //   {
    //       breakpoint: '991px',
    //       numVisible: 2,
    //       numScroll: 1
    //   },
    //   {
    //       breakpoint: '767px',
    //       numVisible: 1,
    //       numScroll: 1
    //   }
    // ];

  }

  openEndMenu() {
    // Open the menu by side
    this.menuCtrl.open('end');
  }

}
