import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import {
  BaseGameService,
  DataService,
  UtilityService,
  SettingsDataService,
  EventService,
  AdmobService
} from 'src/app/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-readandlearn',
  templateUrl: './read-and-learn.page.html',
  styleUrls: ['./read-and-learn.page.scss']
})
export class ReanAndLearnPage implements OnInit {
  actionCounter = 0;
  dataLoaded: boolean = false;

  dataRequest: any;
  words: any;
  letter: string;

  gameWordArrayShuffled = [];
  displayedWord = '';

  specialwords = {
    prophet: 'u1',
    vegetarian: 'u1',
    pilgrim: 'u1',
    love: 'u1',
    grapes: 'u2',
    lute: 'u2',
    eye: 'u2',
    an_eye: 'u2',
    feast: 'u2',
    tomorrow: 'u3',
    very: 'u3',
    thanks: 'u3',
    to_spread: 'u4',
    suburbs: 'u5',
    high: 'u5',
    a_forest: 'u2',
    strange_stranger: 'u2',
    good: 'u6',
    learn: 'u7',
    the_mountain: 'u8',
    the_messenger: 'u8',
    the_students: 'u8',
    the_night: 'u8',
    the_man: 'u8',
    the_child: 'u8',
    the_sun: 'u8',
    the_nightingale: 'u9',
    the_country: 'u9',
    the_boy: 'u9',
    the_bananas: 'u9',
    pepper: 'u9',
    God: 'u10',
    this: 'u10',
    this_masculine: 'u10',
    to_spread_news: 'u11',
    the_dates: 'u8',
    the_dog: 'u12',
    the_heart: 'u17',
    dog: 'u13',
    heart: 'u14',
    yogurt: 'u15',
    long: 'u16',
    bananas: 'u17',
    apricots: 'u17',
  }

  showFavorites: boolean = false;

  routeParamSub$: Subscription;
  suffleSub$: Subscription;
  turnCardSub$: Subscription;
  favoriteSub$: Subscription;
  backSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private eventService: EventService,
    private dataService: DataService,
    private baseGameService: BaseGameService,
    private settingsDataService: SettingsDataService,
    public admobService: AdmobService,
  ) {
    this.attachEvents();
  }

  ngOnInit() {
    this.routeParamSub$ = this.route.params.subscribe(params => {
      const { letter } = params;
      this.letter = letter;
      this.getData();
    });
  }

  getData() {
    this.dataService.getData('matchword').subscribe(data => {
      this.words = data;
      this.dataLoaded = true;
      this.init();
      
      if (!this.settings.appPurchased) {
        setTimeout(() => {
          this.admobService.showRewardVideo();
        }, 5000);
      }
    });
  }

  init() {
    var gameWordArray = this.baseGameService.getGameWordArray(this.words, this.letter);
    if (gameWordArray.length === 1) {
      this.gameWordArrayShuffled = gameWordArray[0].meta.words_combination;
    } else {
      //combines all arrays to one large array
      gameWordArray.forEach((array) => {
        array.meta.words_combination.forEach((obj) => {
          this.gameWordArrayShuffled.push(obj);
        });
      });
    }
    //this.gameWordArrayShuffled = _.shuffle(this.gameWordArrayShuffled);
    var wordIndex = 0;
    this.gameWordArrayShuffled.forEach((combi) => {
      if (this.settings.favorites === undefined) { this.settings.favorites = {}; }

      if (this.settings.favorites[combi.id] !== undefined) {
        combi.isFavorite = this.settings.favorites[combi.id];
      } else {
        this.settings.favorites[combi.id] = false;
        combi.isFavorite = false;
      }

      combi.showArabicWord = true;
      combi.wordIndex = wordIndex++;

      if (combi.audio != '') {
        combi.sound = this.utilityService.serverUrlByFileName(combi.audio);
      }

      var specialwordsKey = combi.english_word.replace(/ /g, '_');
      specialwordsKey = specialwordsKey.replace("(", '');
      specialwordsKey = specialwordsKey.replace(")", '');
      specialwordsKey = specialwordsKey.replace("/", '_');
      //console.log(specialwordsKey);
      if (this.specialwords[specialwordsKey] !== undefined) {
        combi.specialText = this.specialwords[specialwordsKey];
      } else {
        combi.specialText = false;
      }
    });

  };

  attachEvents() {
    this.suffleSub$ = this.eventService.onShuffleClicked.subscribe(value => {
      if (value) {
        this.gameWordArrayShuffled = _.shuffle(this.gameWordArrayShuffled);
      } else {
        this.gameWordArrayShuffled = _.sortBy(this.gameWordArrayShuffled, 'wordIndex');
      }
    })

    this.turnCardSub$ = this.eventService.onTurnCardClicked.subscribe(value => {
      this.gameWordArrayShuffled.forEach((combi) => {
        combi.showArabicWord = !value;
      });
    });

    this.favoriteSub$ = this.eventService.onFavoriteClicked.subscribe(value => {
      this.showFavorites = value;
    });

    this.backSub$ = this.eventService.onBackClicked.subscribe(value => {
      this.utilityService.stopAudio();
    });
  }

  toggleFavorite(word, e) {
    e.stopImmediatePropagation();
    
    const actionAllowed = this.handleActionCounter();
    if (!actionAllowed) return;

    word.isFavorite = !word.isFavorite;
    this.settings.favorites[word.id] = word.isFavorite;
    this.settingsDataService.changeSettings(this.settings);
  }

  flipCard(word) {
    const actionAllowed = this.handleActionCounter();
    if (!actionAllowed) return;
    word.showArabicWord = !word.showArabicWord;
  }

  showSpecialHelp(e, specialCode) {
    e.stopImmediatePropagation();
    this.eventService.triggerHelp(specialCode);
  }

  playAudio(audioEvent) {
    const actionAllowed = this.handleActionCounter();
    if (!actionAllowed) return;
    this.utilityService.playAudio(audioEvent);
  }

  handleActionCounter() {
    if (this.settings.appPurchased) return true;
    
    this.actionCounter++;
    if (this.actionCounter == 6) {
      this.actionCounter = 0;
      this.admobService.showRewardVideo();
      return false;
    }

    return true;
  }

  ngOnDestroy() {
    this.routeParamSub$.unsubscribe();
    this.suffleSub$.unsubscribe();
    this.turnCardSub$.unsubscribe();
    this.favoriteSub$.unsubscribe();
    this.backSub$.unsubscribe();
  }

  get settings() {
    return this.settingsDataService.settings;
  }
}
