import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage {

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {}

  openEndMenu() {
    // Open the menu by side
    this.menuCtrl.open('end');
  }
}
