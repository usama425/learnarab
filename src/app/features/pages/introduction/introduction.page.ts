import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GeneralInfo } from "src/app/core/models/general-info.model";
import { AdmobService, SettingsDataService } from "src/app/core/services";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.page.html",
  styleUrls: ["./introduction.page.scss"],
})
export class IntroductionPage implements OnInit {
  data: GeneralInfo;
  introTexts: string[];

  constructor(
    private route: ActivatedRoute,
    private settingsDataService: SettingsDataService,
    private admobService: AdmobService
  ) {}

  ngOnInit() {
    this.data = this.route.snapshot.data.info as GeneralInfo;
    this.introTexts = this.data.introtexts;

    if (!this.settings.appPurchased) {
      setTimeout(() => {
        this.admobService.showRewardVideo();
      }, 5000);
    }
  }

  get settings() {
    return this.settingsDataService.settings;
  }
}
