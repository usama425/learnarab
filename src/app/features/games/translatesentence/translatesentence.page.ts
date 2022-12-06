import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ArabCharacterService,
  ProgressDataService,
  DataService,
  BaseGameService,
  UtilityService,
  TimerService,
  EventService,
  AdmobService,
  SettingsDataService,
} from "src/app/core/services";
import * as _ from "lodash";
import { BaseGameComponent } from "../base/base-game.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-translatesentence",
  templateUrl: "./translatesentence.page.html",
  styleUrls: ["./translatesentence.page.scss"],
})
export class TranslateSentencePage extends BaseGameComponent {
  gameWordArray: any = [];
  timeOutTime: number = 3000;
  activeWordArray: any = [];
  lastWord: number = 0;
  wordStatus = {
    available: "available",
    correct: "goed",
    incorrect: "fout",
  };
  animationStatus = {
    none: "",
    moveIn: "moveIn",
    moveOut: "moveOut",
    moveOutDelayed: "moveOutDelayed",
    leftPos: "leftPos",
    rightPos: "rightPos",
    appear: "appear",
  };
  translations: any = [];
  originalSentence: string = " ";
  sentenceAnimation = this.animationStatus.none;
  combinations: any;
  translateFrom: string = "";

  constructor(
    public route: ActivatedRoute,
    public modalCtrl: ModalController,
    public eventService: EventService,
    public timerService: TimerService,
    private progressDataService: ProgressDataService,
    private dataService: DataService,
    private baseGameService: BaseGameService,
    public utilityService: UtilityService,
    public admobService: AdmobService,
    public settingDataService: SettingsDataService
  ) {
    super(
      route,
      modalCtrl,
      utilityService,
      eventService,
      timerService,
      admobService,
      settingDataService
    );

    this.gameName = "rightsentencepick";
    this.gameTimeMSeconds = 120000;
  }

  getGameData() {
    this.dataService.getData(this.gameName).subscribe((data) => {
      this.combinations = data;
      this.gameWordArray = this.baseGameService.getGameWordArray(
        this.combinations,
        this.letter
      );
      this.gameWordArray = _.shuffle(this.gameWordArray);
      this.startGame();
    });
  }

  startGame() {
    this.currentScore = 0;
    this.baseGameService.updateScore(this.currentScore);
    this.setData();
    this.timerService.initTimer(this.gameTimeMSeconds);
  }

  setData() {
    this.activeWordArray = this.gameWordArray[this.lastWord];
    this.lastWord++;
    this.lastWord = this.lastWord % this.gameWordArray.length;
    this.translations = _.shuffle(this.activeWordArray.meta.translations);
    this.originalSentence = this.activeWordArray.meta.originalSentence;
    this.isChecking = false;
    this.translateFrom = this.activeWordArray.meta.language_to_translate_from;
    this.translations.map((translation) => {
      translation.status = this.wordStatus.available;
      translation.animation = this.animationStatus.leftPos;
    });
    setTimeout(() => {
      this.sentenceAnimation = this.animationStatus.appear;
      this.translations.map((translation) => {
        translation.animation = this.animationStatus.moveIn;
      });
    }, 500);
  }

  select(translation) {
    if (this.isChecking) {
      return;
    }
    this.isChecking = true;
    if (translation.isCorrectSentence) {
      var id = this.activeWordArray.meta.id;
      this.progressDataService.increaseAssignementProgress(
        this.gameName,
        this.letter,
        id
      );
      translation.status = this.wordStatus.correct;
      this.currentScore++;
      this.baseGameService.updateScore(this.currentScore);
    } else {
      translation.status = this.wordStatus.incorrect;
    }
    this.translations.map((translation) => {
      if (translation.status === this.wordStatus.available) {
        translation.animation = this.animationStatus.moveOut;
      } else {
        translation.animation = this.animationStatus.moveOutDelayed;
      }
    });
    this.sentenceAnimation = this.animationStatus.none;
    setTimeout(() => {
      this.setData();
    }, this.timeOutTime);
  }
}
