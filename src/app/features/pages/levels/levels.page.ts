import { Component, OnInit } from '@angular/core';
import { ArabCharacterService, ProgressDataService, SettingsDataService, EventService, UtilityService, AdmobService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss']
})
export class LevelsPage implements OnInit {
  debugMode: boolean = false;

  firstLetter: string;
  secondLetter: string;
  thirdLetter: string;

  firstPhonetic: string;
  secondPhonetic: string;
  thirdPhonetic: string;

  firstRequiredPercentage: number = 0; // allways 0 ( puur ter illustratie, eerste letter is altijd open)
  secondRequiredPercentage: number = 40;
  thirdRequiredPercentage: number = 40;

  encodedFirstLetter: string; //$stateParams.firstLetter;
  encodedSecondLetter: string; //$stateParams.secondLetter;
  encodedThirdLetter: string; //$stateParams.thirdLetter;

  thirdLetterExists: boolean;

  // available modules
  firstLetterAvailable: boolean = true; // ALLWAYS STAYS TRUE ( since its the first for example purposes.)
  secondLetterAvailable: boolean = true;
  thirdLetterAvailable: boolean = true;

  // intialisation
  firstAverage: number = 0;
  secondAverage: number = 0;
  thirdAverage: number = 0;

  levelAverage: number = 0;
  showLamp1: string = 'uit';
  showLamp2: string = 'uit';
  showLamp3: string = 'uit';

  count: number = 0;
  letterTotal: number = 0;

  routeParamSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private arabCharacterService: ArabCharacterService,
    private settingsDataService: SettingsDataService,
    private utilityService: UtilityService,
    private eventService: EventService,
    private progressDataService: ProgressDataService,
    private admobService: AdmobService
  ) {
    this.debugMode = this.utilityService.isDebugModeEnabled();
  }

  ngOnInit() {
    this.routeParamSub$ = this.route.params.subscribe(params => {
      const { firstLetter, secondLetter, thirdLetter } = params;

      this.firstLetter = decodeURIComponent(firstLetter);
      this.secondLetter = decodeURIComponent(secondLetter);
      this.thirdLetter = decodeURIComponent(thirdLetter);

      this.encodedFirstLetter = firstLetter;
      this.encodedSecondLetter = secondLetter;
      this.encodedThirdLetter = thirdLetter;

      this.init();
    });
    if (!this.settings.appPurchased) {
      setTimeout(() => {
        this.admobService.showRewardVideo();
      }, 5000);
    }
  }

  init() {
    this.thirdLetterExists = this.thirdLetter !== 'x' ? true : false;

    this.firstPhonetic = this.arabCharacterService.getPhonetic(this.firstLetter);
    this.secondPhonetic = this.arabCharacterService.getPhonetic(this.secondLetter);
    this.thirdPhonetic = this.arabCharacterService.getPhonetic(this.thirdLetter);

    // if(this.debugMode) {
    //   this.secondRequiredPercentage = 0;
    //   this.thirdRequiredPercentage = 0;
    // }

    this.processLevels();
  }

  processLevels() {
    this.firstAverage = this.progressDataService.getLetterProgress(this.firstLetter);
    //this.secondLetterAvailable = (this.firstAverage >= this.secondRequiredPercentage) || this.settings.fullMode;
    this.testIfFirstUpgrade();

    this.secondAverage = this.progressDataService.getLetterProgress(this.secondLetter);
    //this.thirdLetterAvailable = (this.secondAverage >= this.thirdRequiredPercentage) || this.settings.fullMode;
    if (this.secondAverage > 60 && this.secondLetter === 'ى') {
      this.testIfAllDone();
    }
    this.thirdAverage = this.progressDataService.getLetterProgress(this.thirdLetter);

    if (this.thirdLetter == 'x') {
      this.levelAverage = (this.firstAverage + this.secondAverage) / 2;
    } else {
      this.levelAverage = (this.firstAverage + this.secondAverage + this.thirdAverage) / 3;
    }

    if (this.levelAverage > 30) {
      this.showLamp1 = 'aan';
    } else {
      this.showLamp1 = 'uit';
    }

    if (this.levelAverage > 60) {
      this.showLamp2 = 'aan';
    } else {
      this.showLamp2 = 'uit';
    }

    if (this.levelAverage > 90) {
      this.showLamp3 = 'aan';
    } else {
      this.showLamp3 = 'uit';
    }
  }

  testIfFirstUpgrade() {
    //console.log('testIfFirstUpgrade');
    //console.log('settings and progress loaded');
    //console.log(secondLetterAvailable);
    //console.log(this.settings.firstUpgrade);
    if (this.secondLetterAvailable && this.settings.firstUpgrade === 0) {
      //console.log('showhelptext');
      this.settings.firstUpgrade = 1;
      this.updateSettings();
      this.eventService.triggerHelp('firstletterAchieved');
    }
  }

  testIfAllDone() {
    if (this.settings.allDone === 0) {
      this.settings.allDone = 1;
      this.updateSettings();
      this.eventService.triggerHelp('lastletterAchieved');
    }
  }

  updateSettings() {
    this.settingsDataService.changeSettings(this.settings);
  }

  ngOnDestroy() {
    this.routeParamSub$.unsubscribe();
  }

  get settings() {
    return this.settingsDataService.settings;
  }
}
