import { Component, OnInit } from "@angular/core";
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
import * as _ from "lodash";
import { BaseGameComponent } from "../base/base-game.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-mixmatch",
  templateUrl: "./mixmatch.page.html",
  styleUrls: ["./mixmatch.page.scss"],
})
export class MixMatchPage extends BaseGameComponent {
  combinations: any = [];
  amountOfWordsInGame: number = 4;
  incorrectClassMSeconds: number = 2000;
  activeWordArray: any = [];

  wordsInGame: number = 0;
  userSelection: any = {};

  firstCombinationPointer: number = 0;

  ObjStatusEnum: any = {
    unknown: "unknown",
    correct: "correct",
    wrong: "incorrect",
    disappearing: "disappearing",
  };

  ObjSelectedEnum: any = {
    notselected: "notactive",
    selected: "active",
  };

  ObjAvailableEnum = {
    available: "available",
    notavailable: "notavailable",
  };

  gameWordArray: any = [];
  gameWordArrayShuffled: any;

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

    this.gameName = "mixnmatch3";
    this.gameTimeMSeconds = 120000;
  }

  getGameData() {
    this.dataService.getData(this.gameName).subscribe((data) => {
      this.combinations = data;
      this.gameWordArray = this.baseGameService.getGameWordArray(
        this.combinations,
        this.letter
      );
      this.activeWordArray = this.gameWordArray[0];
      this.activeWordArray = _.shuffle(this.activeWordArray.meta.combination);

      this.startGame();
    });
  }

  setData() {
    var tempArray1 = this.activeWordArray.slice(
      this.firstCombinationPointer,
      this.firstCombinationPointer + this.amountOfWordsInGame
    );
    if (tempArray1.length < this.amountOfWordsInGame) {
      if (this.activeWordArray.length >= this.amountOfWordsInGame) {
        this.firstCombinationPointer = 0;
        var endIndex = this.amountOfWordsInGame - tempArray1.length;
        var overflow = this.activeWordArray.slice(
          this.firstCombinationPointer,
          this.firstCombinationPointer + endIndex
        );
        tempArray1 = tempArray1.concat(overflow);
        this.firstCombinationPointer = endIndex;
      }
    } else {
      this.firstCombinationPointer += this.amountOfWordsInGame;
      if (this.firstCombinationPointer >= this.activeWordArray.length) {
        this.firstCombinationPointer = 0;
      }
    }
    this.wordsInGame = tempArray1.length;
    this.gameWordArrayShuffled = [];
    _.each(tempArray1, (wordCombination) => {
      let tempObject: any = {};
      tempObject.type = "image";
      tempObject.value = this.utilityService.serverUrlByFileName(
        wordCombination.image,
        true
      );

      tempObject.id = wordCombination.id;
      tempObject.status = this.ObjStatusEnum.unknown;
      tempObject.available = this.ObjAvailableEnum.available;
      tempObject.active = this.ObjSelectedEnum.notselected;
      this.gameWordArrayShuffled.push(_.clone(tempObject));
      // add the word
      tempObject.type = "word";
      tempObject.value = wordCombination.word;
      tempObject.phonetic = wordCombination.phonetic;
      tempObject.status = this.ObjStatusEnum.unknown;
      tempObject.available = this.ObjAvailableEnum.available;
      tempObject.active = this.ObjSelectedEnum.notselected;
      this.gameWordArrayShuffled.push(_.clone(tempObject));
      // add the sound
      tempObject.type = "sound";
      tempObject.value = this.utilityService.serverUrlByFileName(
        wordCombination.sound
      );
      tempObject.status = this.ObjStatusEnum.unknown;
      tempObject.available = this.ObjAvailableEnum.available;
      tempObject.active = this.ObjSelectedEnum.notselected;
      this.gameWordArrayShuffled.push(_.clone(tempObject));
      // DEBUG!!!!
      //ProgressDataService.increaseAssignementProgress(gameName,letter,tempObject.id);
    });
    this.gameWordArrayShuffled = _.shuffle(this.gameWordArrayShuffled);
    this.gameWordArrayShuffled = _.chunk(this.gameWordArrayShuffled, 3);

    this.baseGameService.updateScore(this.currentScore);
    //Indexes
    this.userSelection = { image: null, sound: null, word: null };
  }

  select(obj, index) {
    if (this.isChecking) {
      return;
    }
    if (
      obj.available !== this.ObjAvailableEnum.available ||
      obj.status !== this.ObjStatusEnum.unknown
    ) {
      return;
    }
    if (obj.active === this.ObjSelectedEnum.selected) {
      // deselect
      obj.active = this.ObjSelectedEnum.notselected;
      this.userSelection[obj.type] = null;
      this.updateOtherElements(obj.type, this.ObjAvailableEnum.available);
    } else {
      // select
      obj.active = this.ObjSelectedEnum.selected;
      this.userSelection[obj.type] = obj;
      this.updateOtherElements(obj.type, this.ObjAvailableEnum.notavailable);
    }

    if (
      this.userSelection.image !== null &&
      this.userSelection.sound !== null &&
      this.userSelection.word !== null
    ) {
      this.checkCorrect();
    }
  }

  updateOtherElements(type, newAvailability) {
    var allElements = _.flatten(this.gameWordArrayShuffled);
    allElements.map((element) => {
      //console.log(element)
      if (element.type === type) {
        if (
          element.active === this.ObjSelectedEnum.notselected &&
          element.status === this.ObjStatusEnum.unknown
        ) {
          element.available = newAvailability;
        }
      }
    });
  }

  checkCorrect() {
    if (this.isChecking) {
      return;
    }

    if (
      this.userSelection.image.id === this.userSelection.sound.id &&
      this.userSelection.sound.id === this.userSelection.word.id
    ) {
      // correct
      //
      // save for progress

      this.progressDataService.increaseAssignementProgress(
        this.gameName,
        this.letter,
        this.userSelection.image.id
      );
      // save status
      this.userSelection.image.status = this.ObjStatusEnum.correct;
      this.userSelection.sound.status = this.ObjStatusEnum.correct;
      this.userSelection.word.status = this.ObjStatusEnum.correct;
      this.userSelection.image.active = this.ObjSelectedEnum.notselected;
      this.userSelection.sound.active = this.ObjSelectedEnum.notselected;
      this.userSelection.word.active = this.ObjSelectedEnum.notselected;
      this.userSelection = { image: null, sound: null, word: null };
      this.updateOtherElements("image", this.ObjAvailableEnum.available);
      this.updateOtherElements("word", this.ObjAvailableEnum.available);
      this.updateOtherElements("sound", this.ObjAvailableEnum.available);
      this.currentScore++;
      this.baseGameService.updateScore(this.currentScore);
      if (this.currentScore % this.wordsInGame === 0) {
        // end game after 3 seconds
        setTimeout(() => {
          this.startDisappearTransition();
        }, 2000);
        setTimeout(() => {
          this.setData();
        }, 4000);
      }
    } else {
      // save status
      this.userSelection.image.status = this.ObjStatusEnum.wrong;
      this.userSelection.sound.status = this.ObjStatusEnum.wrong;
      this.userSelection.word.status = this.ObjStatusEnum.wrong;
      this.startTimerResetIncorrect();
    }
  }
  startDisappearTransition() {
    var allElements = _.flatten(this.gameWordArrayShuffled);
    allElements.map((element) => {
      //console.log(element)
      element.status = this.ObjStatusEnum.disappearing;
    });
  }

  startTimerResetIncorrect() {
    this.isChecking = true;
    setTimeout(() => {
      this.userSelection.image.status = this.ObjStatusEnum.unknown;
      this.userSelection.sound.status = this.ObjStatusEnum.unknown;
      this.userSelection.word.status = this.ObjStatusEnum.unknown;
      this.userSelection.image.active = this.ObjSelectedEnum.notselected;
      this.userSelection.sound.active = this.ObjSelectedEnum.notselected;
      this.userSelection.word.active = this.ObjSelectedEnum.notselected;
      this.userSelection = { image: null, sound: null, word: null };
      this.updateOtherElements("image", this.ObjAvailableEnum.available);
      this.updateOtherElements("word", this.ObjAvailableEnum.available);
      this.updateOtherElements("sound", this.ObjAvailableEnum.available);
      this.isChecking = false;
    }, this.incorrectClassMSeconds);
  }
}
