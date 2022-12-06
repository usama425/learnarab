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
import { ModalController } from "@ionic/angular";
import { BaseGameComponent } from "../base/base-game.component";
@Component({
  selector: "app-listen-and-sort",
  templateUrl: "./listen-and-sort.page.html",
  styleUrls: ["./listen-and-sort.page.scss"],
})
export class ListenAndSortPage extends BaseGameComponent {
  combinations: any = [];
  gameWordArray: any = [];
  words: any = [];
  sound: any = "";
  wordStatus: string;
  timeOutTime: number = 3000;
  activeWordArray: any = [];
  clickedWordCount: number = 0;
  lastWord: number = 0;

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

    this.gameName = "listenandsort";
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

  setData() {
    this.clickedWordCount = 0;
    this.isChecking = false;
    this.baseGameService.updateScore(this.currentScore);
    this.activeWordArray = this.gameWordArray[this.lastWord];
    this.lastWord++;
    this.lastWord = this.lastWord % this.gameWordArray.length;
    this.activeWordArray.meta.words.map((item, index) => {
      item.wordStatus = "available";
      item.index = index;
    });
    this.words = _.shuffle(this.activeWordArray.meta.words);

    this.sound = this.utilityService.serverUrlByFileName(
      this.activeWordArray.meta.sound
    );

    this.wordStatus = "inProgress";

    this.baseGameService.updateScore(this.currentScore);
  }

  select(selectedWord) {
    if (this.isChecking) {
      return;
    }
    if (this.clickedWordCount >= this.activeWordArray.meta.words.length) {
      return;
    }
    if (selectedWord.wordStatus !== "available") {
      return;
    }
    if (selectedWord.index === this.clickedWordCount) {
      selectedWord.wordStatus = "correct";
    } else {
      selectedWord.wordStatus = "wrong";
    }
    this.clickedWordCount++;
    if (this.clickedWordCount >= this.activeWordArray.meta.words.length) {
      var success = true;
      this.words.map((item) => {
        if (item.wordStatus !== "correct") {
          success = false;
        }
      });
      if (success) {
        var id = this.activeWordArray.meta.id;
        this.progressDataService.increaseAssignementProgress(
          this.gameName,
          this.letter,
          id
        );
        this.baseGameService.updateScore(++this.currentScore);
      }
      this.continueGame();
    }
  }

  continueGame() {
    this.isChecking = true;
    setTimeout(() => {
      this.setData();
    }, this.timeOutTime);
  }
}
