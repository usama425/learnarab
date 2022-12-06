import { Component, OnInit } from "@angular/core";
import _ from "lodash";
import { ActivatedRoute } from "@angular/router";
import {
  ArabCharacterService,
  ProgressDataService,
  DataService,
  BaseGameService,
  UtilityService,
  EventService,
  TimerService,
  AdmobService,
  SettingsDataService,
} from "src/app/core/services";
import { BaseGameComponent } from "../base/base-game.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-match-the-word",
  templateUrl: "./match-the-word.page.html",
  styleUrls: ["./match-the-word.page.scss"],
})
export class MatchTheWordPage extends BaseGameComponent {
  gameWordArray: Array<any> = [];
  words: any;
  amountOfWordsInGame: number = 8;
  incorrectClassMSeconds: number = 1000;
  gameWordArrayShuffled: Array<any> = [];
  selectedWord: any = null;
  wrongWords: Array<any> = [];

  WordStatusEnum: any = {
    notselected: "",
    correct: "correct",
    wrong: "wrong",
    selected: "active",
  };

  animationState: any = {
    slideLeft: "slideLeft",
    slideRight: "slideRight",
    noDisplacement: "noDisplacement",
    left: "left",
    right: "right",
  };

  activeWordArray: any = [];
  wordsInGame: number = 0;
  phoneticLetter: number;

  constructor(
    public route: ActivatedRoute,
    public modalCtrl: ModalController,
    private arabCharacterService: ArabCharacterService,
    private progressDataService: ProgressDataService,
    private dataService: DataService,
    public eventService: EventService,
    public timerService: TimerService,
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

    this.gameName = "matchword";
    this.gameTimeMSeconds = 90000;
  }

  getGameData() {
    this.dataService.getData(this.gameName).subscribe(
      (data) => {
        this.words = data;
        this.gameWordArray = this.baseGameService.getGameWordArray(
          this.words,
          this.letter
        );
        this.phoneticLetter = this.arabCharacterService.getPhonetic(
          this.letter
        );

        this.startGame();
      },
      (error) => {
        console.log("Trahimaaam" + JSON.stringify(error));
      }
    );
  }

  setData() {
    this.activeWordArray = this.gameWordArray[this.gameLevelIndex];
    this.activeWordArray = this.activeWordArray.meta.words_combination;

    this.activeWordArray.map((wordCombination, index) => {
      wordCombination.gedaan =
        Math.random() +
        this.progressDataService.getAssignmentProgress(
          this.gameName,
          this.phoneticLetter,
          wordCombination.id
        );
    });

    var tempArray0 = _.sortBy(this.activeWordArray, "gedaan");

    var tempArray1 = _.slice(tempArray0, 0, this.amountOfWordsInGame);
    this.wordsInGame = tempArray1.length;
    var tempArray2 = _.range(this.wordsInGame);
    tempArray2 = _.shuffle(tempArray2);
    this.gameWordArrayShuffled = [];
    tempArray1.map((wordCombination, index) => {
      var tempObject = {
        english: { word: "", id: "", status: "", animation: "" },
        arabic: { word: "", id: "", status: "", animation: "" },
      };
      tempObject.english.word = wordCombination.english_word;
      tempObject.english.id = wordCombination.id;
      tempObject.arabic.word = tempArray1[tempArray2[index]].arabic_word;
      tempObject.arabic.id = tempArray1[tempArray2[index]].id;
      tempObject.english.status = this.WordStatusEnum.notselected;
      tempObject.arabic.status = this.WordStatusEnum.notselected;
      tempObject.english.animation = this.animationState.left;
      tempObject.arabic.animation = this.animationState.right;
      this.gameWordArrayShuffled.push(tempObject);
    });
    setTimeout(() => {
      _.each(this.gameWordArrayShuffled, (wordCombination) => {
        wordCombination.english.animation = this.animationState.noDisplacement;
        wordCombination.arabic.animation = this.animationState.noDisplacement;
      });
    }, 100);
    this.selectedWord = null;
    this.baseGameService.updateScore(this.currentScore);
  }

  wordClicker(word, index, wordLanguage) {
    if (this.isChecking) {
      return;
    }
    if (word[wordLanguage].status === this.WordStatusEnum.correct) {
      return;
    }
    if (word[wordLanguage].status === this.WordStatusEnum.wrong) {
      return;
    }
    if (this.selectedWord === null) {
      word[wordLanguage].status = this.WordStatusEnum.selected;
      this.selectedWord = word;
    } else {
      if (word[wordLanguage].status === this.WordStatusEnum.selected) {
        word[wordLanguage].status = this.WordStatusEnum.notselected;
        this.selectedWord = null;
      } else {
        if (
          this.selectedWord[wordLanguage].status ===
          this.WordStatusEnum.selected
        ) {
          this.selectedWord[wordLanguage].status =
            this.WordStatusEnum.notselected;
          word[wordLanguage].status = this.WordStatusEnum.selected;
          this.selectedWord = word;
        } else {
          var otherLanguage = wordLanguage === "english" ? "arabic" : "english";
          if (this.selectedWord[otherLanguage].id === word[wordLanguage].id) {
            this.selectedWord[otherLanguage].status =
              this.WordStatusEnum.correct;
            word[wordLanguage].status = this.WordStatusEnum.correct;
            this.progressDataService.increaseAssignementProgress(
              this.gameName,
              this.letter,
              word[wordLanguage].id
            );
            this.currentScore++;
            this.baseGameService.updateScore(this.currentScore);
            if (this.currentScore === this.wordsInGame) {
              _.each(this.gameWordArrayShuffled, (wordCombination) => {
                wordCombination.english.animation =
                  this.animationState.slideLeft;
                wordCombination.arabic.animation =
                  this.animationState.slideRight;
              });
              setTimeout(() => {
                this.endGame();
              }, 2000);
            }
            this.selectedWord = null;
          } else {
            this.selectedWord[otherLanguage].status = this.WordStatusEnum.wrong;
            word[wordLanguage].status = this.WordStatusEnum.wrong;
            this.startTimerResetIncorrect();
            this.isChecking = true;
            this.wrongWords = [
              word[wordLanguage],
              this.selectedWord[otherLanguage],
            ];
          }
        }
      }
    }
  }

  startTimerResetIncorrect() {
    setTimeout(() => {
      this.wrongWords[0].status = this.WordStatusEnum.notselected;
      this.wrongWords[1].status = this.WordStatusEnum.notselected;
      this.selectedWord = null;
      this.wrongWords = [];
      this.isChecking = false;
    }, this.incorrectClassMSeconds);
  }
}
