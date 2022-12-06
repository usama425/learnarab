import { Component, OnInit } from "@angular/core";
import {
  UtilityService,
  ArabCharacterService,
  ProgressDataService,
  DataService,
  BaseGameService,
  EventService,
  TimerService,
  AdmobService,
  SettingsDataService,
} from "src/app/core/services";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { ModalController } from "@ionic/angular";
import { BaseGameComponent } from "../base/base-game.component";

@Component({
  selector: "app-matching-letter",
  templateUrl: "./matching-letter.page.html",
  styleUrls: ["./matching-letter.page.scss"],
})
export class MatchingLetterPage extends BaseGameComponent {
  loading: boolean = false;

  data: any = [];
  blankChars: string[] = ["_", "ـ", "-"];
  gameWordArray: any = [];
  activeWordArray: any = [];
  image: string = "";
  letters: any = [];
  lettersToChooseFrom: any = [];
  selectedIndex: number = -1;
  timeOutTime: number = 2000;
  lastWord: number = 0;
  correct: any;
  fullWord: any;

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

    this.gameName = "matchingletter";
    this.gameTimeMSeconds = 120000;
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
    this.loading = true;

    this.activeWordArray = this.gameWordArray[this.lastWord];
    this.lastWord++;
    this.lastWord = this.lastWord % this.gameWordArray.length;

    this.selectedIndex = -1;
    this.letters = this.activeWordArray.meta.correct_word.split("|");
    this.correct = undefined;
    this.image = this.utilityService.serverUrlByFileName(
      this.activeWordArray.meta.image,
      true
    );
    this.lettersToChooseFrom = this.activeWordArray.meta.letters_to_choose_from;
    this.lettersToChooseFrom = _.shuffle(this.lettersToChooseFrom);
    this.fullWord = this.activeWordArray.meta.concatenated_word;
    this.isChecking = false;
    this.baseGameService.updateScore(this.currentScore);
  }

  select(chosenLetter, index) {
    if (this.isChecking) {
      return;
    }
    this.isChecking = true;
    this.selectedIndex = index;
    if (chosenLetter.isCorrectLetter) {
      var id = this.activeWordArray.meta.id;
      this.progressDataService.increaseAssignementProgress(
        this.gameName,
        this.letter,
        id
      );
      this.correct = true;
      this.baseGameService.updateScore(++this.currentScore);
    } else {
      this.correct = false;
    }
    setTimeout(() => {
      this.setData();
    }, this.timeOutTime);
  }

  finishLoading() {
    this.loading = false;
  }
}
