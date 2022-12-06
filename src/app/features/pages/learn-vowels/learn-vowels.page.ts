import { Component, OnInit } from '@angular/core';
import { GeneralInfo } from 'src/app/core/models/general-info.model';
import { ActivatedRoute } from '@angular/router';

import { ShortVowals, LongVowals } from '../../../data/vowals.data';
import { AdmobService, SettingsDataService, UtilityService } from 'src/app/core/services';

@Component({
  selector: 'app-LearnVowels',
  templateUrl: './learn-vowels.page.html',
  styleUrls: ['./learn-vowels.page.scss']
})
export class LearnVowelsPage implements OnInit {
  baseApiUrl: string;
  data: GeneralInfo;
  
  longVowels: object[];
  shortVowels: object[];

  longVowelsSound: string;
  shortVowelsSound: string;

  constructor(
    private route: ActivatedRoute,
    public utilityService: UtilityService,
    private settingsDataService: SettingsDataService,
    private admobService: AdmobService
  ) {
  }

  ngOnInit() {
    this.data = this.route.snapshot.data.info as GeneralInfo;
    const { longlearnvowels, shortlearnvowels } = this.data;
    this.longVowelsSound = this.utilityService.serverUrlByFileName(longlearnvowels) ;
    this.shortVowelsSound = this.utilityService.serverUrlByFileName(shortlearnvowels);
    
    this.longVowels = LongVowals;
    this.shortVowels = ShortVowals;
    
    if (!this.settings.appPurchased) {
      setTimeout(() => {
        this.admobService.showRewardVideo();
      }, 5000);
    }
  }
  
  get settings() {
    return this.settingsDataService.settings;
  }

  playAudio(audioEvent) {
    this.utilityService.playAudio(audioEvent);
  }

}
