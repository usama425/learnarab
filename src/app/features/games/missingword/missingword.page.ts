import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArabCharacterService, ProgressDataService, DataService, BaseGameService, UtilityService, EventService, TimerService, AdmobService, SettingsDataService } from 'src/app/core/services';
import * as _ from "lodash";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { BaseGameComponent } from '../base/base-game.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-missingword',
  templateUrl: './missingword.page.html',
  styleUrls: ['./missingword.page.scss']
})
export class MissingWordPage extends BaseGameComponent {
  combinations: any = [];
  gameWordArray: any = [];
  sentenceWords: any = [];
  words: any = [];
  selectedIndex: number = -1;
  audio_full: string = '';
  wordFound: number = 0;

  timeOutTime = 3000;

  activeWordArray: any = [];
  lastWord: number = 0;
  sentence: any;
  sentenceGap: any;
  correctWord: any;

  mainAnimation: any;
  sentenceGood: any;

  constructor(
    public route: ActivatedRoute,
    public modalCtrl: ModalController,
    public eventService: EventService,
    private progressDataService: ProgressDataService,
    private dataService: DataService,
    private baseGameService: BaseGameService,
    public utilityService: UtilityService,
    public timerService: TimerService,
    public admobService: AdmobService,
    public settingDataService: SettingsDataService
    ) {
        super(route, modalCtrl, utilityService, eventService, timerService, admobService, settingDataService);

    this.gameName = 'missingword';
    this.gameTimeMSeconds = 110000;
  }

  getGameData() {
    this.dataService.getData(this.gameName).subscribe(data => {
      this.combinations = data;
      this.gameWordArray = this.baseGameService.getGameWordArray(this.combinations, this.letter);
      this.gameWordArray = _.shuffle(this.gameWordArray);
      this.startGame();
    })
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
    this.selectedIndex = -1;
    this.sentence = this.activeWordArray.meta.sentence.split(' ').reverse();
    this.sentenceGap = this.activeWordArray.meta.sentence;
    this.words = this.activeWordArray.meta.optional_words;
    this.audio_full = this.utilityService.serverUrlByFileName(this.activeWordArray.meta.audio_full);
    this.words = _.sampleSize(this.words, this.words.length);
    this.isChecking = false;
    this.activeWordArray.meta.optional_words.map((word) => {
      if (word.isCorrectWord) {
        this.correctWord = word.word;
      }
    });

    this.wordFound = 0;
    this.sentenceGap = this.activeWordArray.meta.sentence.split('....').join('<span class="color-white">___</span>');
    this.sentenceGood = this.activeWordArray.meta.sentence.split('....').join('<span class="color-good" dir="rtl">' + this.correctWord + '</span>');
  }

  moveleft() {
    this.mainAnimation = 'moveLeft';
    setTimeout(() => { this.prepare(); }, 800);
  }

  prepare() {
    this.mainAnimation = 'prepare';
    this.setData();
    setTimeout(() => { this.slideIn(); }, 10);
  };

  slideIn() {
    this.mainAnimation = 'slideIn';
  };

  select(isCorrect, index, audioEvent) {
    if (this.isChecking) { return; }
    this.isChecking = true;
    this.selectedIndex = index;
    if (isCorrect) {
      this.currentScore++;
      this.baseGameService.updateScore(this.currentScore);
      var id = this.activeWordArray.meta.id;
      this.progressDataService.increaseAssignementProgress(this.gameName, this.letter, id);
      this.wordFound = 1;
    }
    setTimeout(() => { this.moveleft(); }, this.timeOutTime);
  }
}