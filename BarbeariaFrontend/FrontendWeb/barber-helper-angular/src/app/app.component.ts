import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private primengConfig: PrimeNGConfig) {

  }

  ngOnInit() {

    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };

    this.changeDetectorRef.detectChanges();

  }

  public ngAfterViewChecked(): void {

    if (this.changeDetectorRef) {

      this.changeDetectorRef.detectChanges();

    }

  }

}
