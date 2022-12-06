import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ProgressDataService,
  DataService,
  BaseGameService,
  UtilityService,
  EventService,
  TimerService,
  AdmobService,
  SettingsDataService,
} from "src/app/core/services";

import * as _ from "lodash";
import { BaseGameComponent } from "../base/base-game.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-rightsentence",
  templateUrl: "./rightsentence.page.html",
  styleUrls: ["./rightsentence.page.scss"],
})
export class RightSentencePage extends BaseGameComponent {
  gameWordArray: any = [];
  combinations: any = [];
  sentence: any = [];
  words: any = [];
  originalWords: any = [];

  timeOutTime: number = 2000;
  isGameComplete: boolean = false;
  isChecking: boolean = false;
  activeWordArray: any = [];
  lastWord: number = 0;

  english: any;
  audio: string;
  wordslength: number;
  animationState = {
    invisible: "invisible",
    visible: "visible",
    disappearing: "disappearing",
  };
  sentenceAnimationState = this.animationState.invisible;
  wordsAnimationState = this.animationState.invisible;

  maxFontsize = 9;
  okFrames = 0;

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

    this.gameName = "rightsentencesort";
    this.gameTimeMSeconds = 160000;
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

  listSorted(list: any) {
    this.words = list;
    this.checkCorrect();
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
    this.sentence = this.activeWordArray.meta.sentence.trim();
    this.wordslength = this.sentence.length;
    this.originalWords = this.sentence.split(" ").reverse();
    this.words = this.sentence.split(" ").reverse();
    this.words = _.shuffle(this.words);
    this.english = this.activeWordArray.meta.english;
    this.audio = this.utilityService.serverUrlByFileName(
      this.activeWordArray.meta.audio
    );
    this.isChecking = false;
    this.checkCorrect();

    let elementlist, tops;
    let maxFontsize = 9;

    this.okFrames = 0;

    setTimeout(() => {
      var updaterIV = setInterval(() => {
        tops = {};

        elementlist = document.querySelectorAll(".sortable-list-item");
        elementlist.forEach((element: HTMLElement) => {
          tops[element.offsetTop] = 1;
        });

        if (_.size(tops) > 1) {
          maxFontsize -= 0.2;
          elementlist.forEach((element: HTMLElement) => {
            element.style.fontSize = `${maxFontsize}vw`;
          });
        } else {
          this.okFrames++;
          if (this.okFrames > 2) clearInterval(updaterIV);
          if (this.okFrames == 1) {
            this.sentenceAnimationState = this.animationState.visible;
            this.wordsAnimationState = this.animationState.visible;
          }
        }
      }, 10);
    }, 1000);
  }

  dragControlListener = {
    accept: function (sourceItemHandleScope, destSortableScope) {
      if (this.isChecking || this.isGameComplete) {
        return false;
      } else {
        return (
          sourceItemHandleScope.itemScope.sortableScope.$id ===
          destSortableScope.$id
        );
      }
    },
    orderChanged: function () {
      this.checkCorrect();
    },
    allowDuplicates: false,
    containment: ".rightsentence",
  };

  checkCorrect() {
    var rightPlaces = this.originalWords.toString();
    var newPlaces = this.words.toString();
    if (rightPlaces === newPlaces) {
      this.gameComplete();
    }
  }

  gameComplete() {
    this.isChecking = true;
    var id = this.activeWordArray.meta.id;
    this.progressDataService.increaseAssignementProgress(
      this.gameName,
      this.letter,
      id
    );
    this.currentScore++;
    this.baseGameService.updateScore(this.currentScore);
    this.sentenceAnimationState = this.animationState.disappearing;
    this.wordsAnimationState = this.animationState.disappearing;
    setTimeout(() => {
      this.setData();
    }, this.timeOutTime);
  }

  handleClass(i: number) {
    const resultClass =
      this.originalWords[i] === this.words[i] ? "goed" : "fout";
    let sizeClass = "";

    if (this.wordslength > 53) sizeClass = "smallerfont";
    else if (this.wordslength > 43 && this.wordslength < 53)
      sizeClass = "mediumfont";

    return `${resultClass} ${sizeClass}`;
  }
}
