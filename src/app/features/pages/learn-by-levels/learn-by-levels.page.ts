import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { data } from '../../../data/learn-by-levels.data';
import { ProgressDataService, UtilityService, SettingsDataService, AdmobService } from 'src/app/core/services';

@Component({
  selector: 'app-learn-by-levels',
  templateUrl: './learn-by-levels.page.html',
  styleUrls: ['./learn-by-levels.page.scss'],
})
export class LearnByLevelsPage implements OnInit {
  processing: boolean = true;

  debugMode: boolean = false;

  levelData: any = data;

  letterProgress: any = {};

  levelProgress: number[] = [];
  levelAvailable: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private utilityService: UtilityService,
    private progressDataService: ProgressDataService,
    private settingsDataService: SettingsDataService,
    private admobService: AdmobService
  ) {
    this.debugMode = this.utilityService.isDebugModeEnabled();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.processLevels();
    });
    if (!this.settings.appPurchased) {
      setTimeout(() => {
        this.admobService.showRewardVideo();
      }, 5000);
    }
  }

  processLevels() {
    this.processing = true;

    for (var i = 0; i < 13; i++) {
      const { levelsMap } = this.levelData[i];
      this.levelProgress[i] = 0;
      for (var j = 0; j < levelsMap.length; j++) {
        this.levelProgress[i] += this.progressDataService.getLetterProgress(levelsMap[j]);
      }
      this.levelProgress[i] /= levelsMap.length;
      this.levelProgress[i] = Math.floor(this.levelProgress[i] / 30); // gives us 0,1,2 or 3 for right image (lampje)?

      /* NOT NEEDED BELOW CODE AS CLIENT WANTS ALL LEVELS OPEN */
      /* if (i == 0) {
        this.levelAvailable[i] = "";
      } else if ((this.levelProgress[i] > 1 && i < 13) || this.debugMode || this.settings.fullMode) {
        this.levelAvailable[i] = "available";
      } else {
        this.levelAvailable[i] = "notClickable";
      } */
    }

    this.processing = false;
  }

  showLevel(level) {
    const { levelLink } = this.levelData[level];
    const routeParams = Object.values(levelLink);
    this.router.navigate(["/pages/levels", ...routeParams]);
    
    // if (level > 1 && !this.settings.appPurchased && !this.debugMode) {
    //   this.showConfirm();
    // } else {
    //   const { levelLink } = this.levelData[level];
    //   const routeParams = Object.values(levelLink);
    //   this.router.navigate(["/pages/levels", ...routeParams]);
    // }
  }

  switchFull() {
    this.settingsDataService.changeSettings(this.settings);

    for (var i = 1; i < 13; i++) {
      if ((this.levelProgress[i] > 1 && i < 13) || this.debugMode || this.settings.fullMode) {
        this.levelAvailable[i] = "available";
      } else {
        this.levelAvailable[i] = "notClickable";
      }
    }
  }

  async showConfirm() {
    const alert = await this.alertController.create({
      header: 'Upgrade to full version',
      message: 'To play this level you will have to upgrade to the full version',
      buttons: [
        {
          text: 'Maybe later',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('You are not sure');
          }
        }, {
          text: 'Buy',
          handler: () => {
            this.router.navigateByUrl('/pages/buy');
          }
        }
      ]
    });

    await alert.present();
  };

  get settings() {
    return this.settingsDataService.settings;
  }

}
