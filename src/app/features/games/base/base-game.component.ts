import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ScoreInfoComponent } from "src/app/shared/components/score-info/score-info.component";
import { ShowScore } from "src/app/core/models";
import {
  EventService,
  AdmobService,
  UtilityService,
  TimerService,
  SettingsDataService,
} from "src/app/core/services";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  template: "",
})
export class BaseGameComponent implements OnInit {
  routeParamSub$: Subscription;
  gameStartSub$: Subscription;
  gameReplaySub$: Subscription;
  gameEndSub$: Subscription;

  gameName: string;
  gameTimeMSeconds: number;

  currentScore: number = 0;
  gameLevelIndex: number = 0;

  isChecking: boolean = false;
  letter: string;

  constructor(
    public route: ActivatedRoute,
    public modalCtrl: ModalController,
    public utilityService: UtilityService,
    public eventService: EventService,
    public timerService: TimerService,
    public admobService: AdmobService,
    public settingsDataService: SettingsDataService
  ) {
    this.gameStartSub$ = this.eventService.onGameEnd.subscribe((data) => {
      this.endGame();
    });

    this.gameReplaySub$ = this.eventService.onReplay.subscribe((result) => {
      this.startGame();
    });

    this.gameEndSub$ = this.eventService.onBackClicked.subscribe((result) => {
      this.backGame();
    });
  }

  ngOnInit() {
    this.routeParamSub$ = this.route.params.subscribe((params) => {
      const { letter } = params;
      this.letter = letter;
      this.getGameData();
    });
  }

  getGameData() {}

  setData() {}

  startGame() {
    this.isChecking = false;
    this.gameLevelIndex = 0;
    this.currentScore = 0;
    this.setData();
    this.timerService.initTimer(this.gameTimeMSeconds);
  }

  endGame() {
    this.isChecking = true;
    this.utilityService.stopAudio();
    this.eventService.triggerStopTicking();
    this.timerService.stop();

    // Show Ad before opening score modal
    if (!this.settings.appPurchased) {
      this.showAd();
    }

    this.showScoreInfoModal({ letter: this.letter, gameName: this.gameName });
  }

  backGame() {
    this.utilityService.stopAudio();
    this.eventService.triggerStopTicking();
    this.timerService.stop();
  }

  showAd() {
    this.admobService.showRewardVideo();
  }

  // Not Used Currently
  showRandomAd() {
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber % 2 == 0) {
      // Show Interstitial Ad
      this.admobService.showInterstitial();
    } else {
      // Show Video Reward Ad
      this.admobService.showRewardVideo();
    }
  }

  playAudio(audioEvent) {
    this.utilityService.playAudio(audioEvent);
  }

  async showScoreInfoModal(data: ShowScore) {
    const modal = await this.modalCtrl.create({
      component: ScoreInfoComponent,
      componentProps: {
        data,
      },
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.routeParamSub$.unsubscribe();
    this.gameStartSub$.unsubscribe();
    this.gameReplaySub$.unsubscribe();
    this.gameEndSub$.unsubscribe();
  }

  get settings() {
    return this.settingsDataService.settings;
  }
}
