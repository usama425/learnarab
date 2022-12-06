import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GeneralInfo } from 'src/app/core/models/general-info.model';
import { AdmobService, SettingsDataService } from 'src/app/core/services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

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

  openUrl() {
    const browser = this.inAppBrowser.create(this.data.websiteurl, '_blank', 'location=yes');
  }

  get settings() {
    return this.settingsDataService.settings;
  }

}
