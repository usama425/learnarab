import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { GeneralInfo } from 'src/app/core/models/general-info.model';
import { ActivatedRoute } from '@angular/router';
import { AdmobService, SettingsDataService } from 'src/app/core/services';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.page.html',
  styleUrls: ['./order-book.page.scss']
})
export class OrderBookPage implements OnInit {
  data: GeneralInfo;

  constructor(
    private route: ActivatedRoute,
    private inAppBrowser: InAppBrowser,
    private settingsDataService: SettingsDataService,
    private admobService: AdmobService
  ) { }

  ngOnInit() {
    this.data = this.route.snapshot.data.info as GeneralInfo;
    if (!this.settings.appPurchased) {
      setTimeout(() => {
        this.admobService.showRewardVideo();
      }, 5000);
    }
  }
  
  get settings() {
    return this.settingsDataService.settings;
  }
  openOrderBookUrl() {
    const browser = this.inAppBrowser.create("https://www.imasterarabic.com/bookstore", '_blank', 'location=yes');
  }

}
