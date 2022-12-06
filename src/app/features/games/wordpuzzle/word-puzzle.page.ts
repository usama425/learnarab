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
  selector: "app-word-puzzle",
  templateUrl: "./word-puzzle.page.html",
  styleUrls: ["./word-puzzle.page.scss"],
})
export class WordPuzzlePage extends BaseGameComponent {
  data: any = [];
  letters: any = [];
  englishWord: string = "";
  createdWord: string = "";
  wordStatus: string = "";

  gameWordArray: any = [];
  correctWord: any = [];
  letterAmount: number = -1;
  timeOutTime: number = 2000;

  lastWord: number = 0;
  currentWord: any;

  activeWordArray: any = [];

  audio: any;
  moveableAnnimation: string = "";

  constructor(
    public route: ActivatedRoute,
    public modalCtrl: ModalController,
    public eventService: EventService,
    public timerService: TimerService,
    private dataService: DataService,
    private progressDataService: ProgressDataService,
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

    this.gameName = "wordpuzzle";
    this.gameTimeMSeconds = 100000;
  }

  getGameData() {
    this.dataService.getData(this.gameName).subscribe((data) => {
      this.data = data;
      this.gameWordArray = this.baseGameService.getGameWordArray(
        this.data,
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
    this.correctWord = _.map(
      this.activeWordArray.meta.arab_characters,
      "character"
    ).join("");
    this.letterAmount = this.activeWordArray.meta.arab_characters.length;
    this.englishWord = this.activeWordArray.meta.english_word;
    this.activeWordArray.meta.arab_characters.map((letter) => {
      letter.status = "available";
    });
    this.letters = _.chain(this.activeWordArray.meta.arab_characters)
      .sampleSize(this.activeWordArray.meta.arab_characters.length)
      .chunk(4)
      .value();
    this.createdWord = "";
    this.moveableAnnimation = "";
    this.currentWord = [];
    if (this.letters.length >= 9) {
      throw new Error(
        "More than 9 characters are used, an amount of more than 10 is not supported"
      );
    }
    this.audio = this.utilityService.serverUrlByFileName(
      this.activeWordArray.meta.audio
    );
    this.wordStatus = "inProgress";

    this.baseGameService.updateScore(this.currentScore);
  }

  select(selectedLetter, index, arrayNumber) {
    if (this.letters[arrayNumber][index].status === "available") {
      this.createdWord += selectedLetter;
      this.letters[arrayNumber][index].status = "used";
      this.letterAmount--;
      if (this.letterAmount === 0) {
        this.checkCorrect();
      }
      this.currentWord.unshift(index);
    } else {
      if (this.currentWord[0] === index && this.letterAmount !== 0) {
        this.createdWord = this.createdWord.slice(0, -selectedLetter.length);
        this.letterAmount++;
        this.letters[arrayNumber][index].status = "available";
        this.currentWord.shift();
      }
    }
  }

  checkCorrect() {
    if (this.correctWord === this.createdWord) {
      //console.log('correct!');
      this.wordStatus = "correct";
      var id = this.activeWordArray.meta.id;
      this.progressDataService.increaseAssignementProgress(
        this.gameName,
        this.letter,
        id
      );
      this.baseGameService.updateScore(++this.currentScore);
    } else {
      this.wordStatus = "incorrect";
    }
    setTimeout(() => {
      //animate arab letters out of screen
      this.removeLetters();
    }, this.timeOutTime - 1000);

    setTimeout(() => {
      //Game complete
      this.setData();
    }, this.timeOutTime);
  }

  removeLetters() {
    this.moveableAnnimation = "animationStart";
    // for (var i = 0; i < this.letters.length; i++) {
    //     var temp_1 = this.letters[i].length;
    //     for (var j = 0; j < temp_1; j++) {
    //         this.letters[i][j].status = 'disappear';
    //     }
    // }
  }
}
