import { Component, OnInit } from "@angular/core";
import {
  UtilityService,
  ArabCharacterService,
  ProgressDataService,
  DataService,
  BaseGameService,
  TimerService,
  EventService,
  AdmobService,
  SettingsDataService,
} from "src/app/core/services";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { BaseGameComponent } from "../base/base-game.component";
import { ModalController } from "@ionic/angular";
@Component({
  selector: "app-listen-and-pick",
  templateUrl: "./listen-and-pick.page.html",
  styleUrls: ["./listen-and-pick.page.scss"],
})
export class ListenAndPickPage extends BaseGameComponent {
  combinations: any = [];
  gameWordArray: any = [];
  sound: string = "";
  words: any = [];
  selectedIndex: number = -1;
  soundStatus: string = "";
  timeOutTime: number = 3000;
  lastWord: number = 0;
  activeWordArray: any = [];

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

    this.gameName = "listenandpick";
    this.gameTimeMSeconds = 90000;
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

  setData() {
    this.activeWordArray = this.gameWordArray[this.lastWord];
    this.lastWord++;
    this.lastWord = this.lastWord % this.gameWordArray.length;

    this.sound = this.utilityService.serverUrlByFileName(
      this.activeWordArray.meta.sound
    );

    this.words = _.shuffle(this.activeWordArray.meta.words);
    this.words.map((word) => {
      word.wordStatus = "available";
    });
    this.soundStatus = "available";
    this.isChecking = false;

    this.baseGameService.updateScore(this.currentScore);
  }

  select(word) {
    if (this.isChecking) {
      return;
    }
    this.soundStatus = "";
    this.isChecking = true;
    if (word.isCorrectWord) {
      word.wordStatus = "wolkgoed";
      var id = this.activeWordArray.meta.id;
      this.progressDataService.increaseAssignementProgress(
        this.gameName,
        this.letter,
        id
      );
      this.baseGameService.updateScore(++this.currentScore);
    } else {
      word.wordStatus = "wolkfout";
    }
    this.words.map((otherWord) => {
      if (otherWord.wordStatus === "available") {
        otherWord.wordStatus = "notused";
      }
    });
    setTimeout(() => {
      this.setData();
    }, this.timeOutTime);

    this.eventService.triggerStopTicking();
  }
}
