import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { ArabCharacterService } from './arab-character.service';

import { AvailableGames } from 'src/app/data/available-games.data';
import { DataFilesQueue } from 'src/app/data/files-queue.data';
import { DataService } from './data.service';
import { LocalStorageService } from './localstorage.service';
import { FileService } from './file.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressDataService {
  availableGames: any;
  dataFilesQueue: any;
  
  storedProgress: any = {};
  progressData: any = {};
  progressLoaded: boolean = false;
  
  private subject: Subject<any>;

  constructor(
    private localStorageService: LocalStorageService,
    private fileService: FileService,
    private arabCharacterService: ArabCharacterService,
    private dataService: DataService
  ) {
    this.subject = new Subject();
    this.availableGames = AvailableGames;
    this.dataFilesQueue = DataFilesQueue;
  }

  trigger() {
    this.subject.next({
      progressData: this.progressData,
      progressLoaded: this.progressLoaded
    })
  }

  subscribe(next, err?, complete?) {
    return this.subject.subscribe(next, err, complete)
  }

  /** Main Methods **/

  initProgress() {
    if (this.progressLoaded == true) return;

    //only local data available
    this.loadStoredProgress();
  }

  loadStoredProgress() {
    // this.storedProgress = this.localStorageService.getProgressData();
    // if (!this.storedProgress) {
    //   console.log('NO Data in local storage');
      // no progress found!
      // file based backup available?
      this.fileService.readProgressFile().then(content => {
        console.log('progress backup contents are:');
        console.log(content.data);
        try {
          this.storedProgress = JSON.parse(content.data);
        } catch (e) {
          // forget about it :)
          console.log('error parsing json from settings backup');
          this.storedProgress = {};
        }
        this.loadProgress();
      }, error => {
        console.log("REDADING " + JSON.stringify(error));
        // error
        // new installation
        console.log('reading progress backup from json file failed!!!');
        this.storedProgress = {};
        this.loadProgress();
      });
    // } else {
    //   this.loadProgress();
    // }
  }

  loadProgress() {
    this.initializeProgressDataRegular('rightsentencesort');
    this.initializeProgressDataExeptional('matchword', 'words_combination');
    this.initializeProgressDataRegular('matchingletter');
    this.initializeProgressDataRegular('missingword');
    this.initializeProgressDataExeptional('mixnmatch3', 'combination');
    this.initializeProgressDataRegular('wordpuzzle');
    this.initializeProgressDataRegular('listenandsort');
    this.initializeProgressDataRegular('listenandpick');
    this.initializeProgressDataRegular('rightsentencepick');
  }

  initializeProgressDataRegular(gameName) {
    //console.log("load data");
    this.dataService.getData(gameName).subscribe((data) => {
      //console.log("data loaded");

      data.forEach((result) => {
        if (result && result.meta) {
          this.handleProgressActions(result.meta.arabic_letter, gameName, result.meta.id);
        }
      });
      this.setDatafileDone(gameName);
    });
  }

  initializeProgressDataExeptional(gameName, extraJSONkey) {
    this.dataService.getData(gameName).subscribe((data) => {
      data.forEach((result) => {
        if (result && result.meta) {
          result.meta[extraJSONkey].forEach((secondResult) => {
            this.handleProgressActions(result.meta.arabic_letter, gameName, secondResult.id);
          });
        }
      });
      this.setDatafileDone(gameName);
    });
  }

  /** Main Methods End **/

  setDatafileDone(dataFileName) {
    var index = this.dataFilesQueue.indexOf(dataFileName);
    if (index != -1) {
      console.log(dataFileName + ' processed')
      this.dataFilesQueue.splice(index, 1);
      if (this.dataFilesQueue.length == 0) {
        this.loadProgressDone();
      }
    }
  }

  loadProgressDone() {
    console.log('Progress loaded');
    this.progressLoaded = true;

    // Save Progress Data
    this.saveProgressData();

    this.trigger();
  }

  saveProgressData() {
    this.localStorageService.storeProgressData(this.progressData);

    this.fileService.writeProgressFile(JSON.stringify(this.progressData)).then(status => {
      console.log('Progress file Saved with new content: ');
      console.log(JSON.stringify(this.progressData));

      return true;
    }, error => {
      console.log('Error while Progress file Saved');
      return false;
    });
  }

  //
  // public functions
  //

  // assignment management
  getAssignmentProgress(gameName, phoneticLetter, id) {
    return this.progressData[gameName][phoneticLetter][id];
  }

  setAssignmentProgress(gameName, phoneticLetter, id, newVal, saveProgress = true) {
    if (this.progressData[gameName] === undefined) {
      this.progressData[gameName] = {};
    }

    if (this.progressData[gameName][phoneticLetter] === undefined) {
      this.progressData[gameName][phoneticLetter] = {};
    }

    this.progressData[gameName][phoneticLetter][id] = newVal;

    // Save Progress
    if (saveProgress) {
      this.saveProgressData();
    } else {
      console.log('Not saving to file')
    }

  }

  increaseAssignementProgress(gameName, letter, id) {
    var phoneticLetter = this.arabCharacterService.getPhonetic(letter);
    var oldVal = this.getAssignmentProgress(gameName, phoneticLetter, id);
    if (!oldVal) {
      this.setAssignmentProgress(gameName, phoneticLetter, id, 1);
    } else {
      this.setAssignmentProgress(gameName, phoneticLetter, id, oldVal + 1);
    }
  }

  // game&letter Progress
  getGameLetterAchieved(gameName, letter) {
    var phoneticLetter = this.arabCharacterService.getPhonetic(letter);
    //console.log('Calculate achieved amount for letter ' + phoneticLetter);
    //console.log(_.filter($rootScope.progressData[gameName][phoneticLetter],function(num){ return num >0; }).length);
    return _.filter(this.progressData[gameName][phoneticLetter], function (num) { return num > 0; }).length;
  }

  getGameLetterMax(gameName, letter) {
    var phoneticLetter = this.arabCharacterService.getPhonetic(letter);
    //        console.log('Calculate max amount for letter ' + phoneticLetter);
    //        console.log(_.size($rootScope.progressData[gameName][phoneticLetter]));
    //console.log($rootScope.progressData[gameName][phoneticLetter]);
    return _.size(this.progressData[gameName][phoneticLetter]);
  }

  getGameLetterProgress(gameName, letter) {
    //console.log ('done ' + gameName + ' - ' + letter + ' - ' + getGameLetterAchieved(gameName,letter));
    //console.log ('max ' + gameName + ' - ' + letter + ' - ' + getGameLetterMax(gameName,letter));
    return this.getPercent(this.getGameLetterAchieved(gameName, letter), this.getGameLetterMax(gameName, letter));
  }

  // letter progress
  getLetterProgress(letter) {
    var phoneticLetter = this.arabCharacterService.getPhonetic(letter);
    //console.log('Calculate progress for letter ' + phoneticLetter);
    //console.log('Calculate progress for letter ' + letter);
    var assignmentsTotal = 0;
    var assigmentsPassed = 0;
    //console.log($rootScope.progressData);
    //loop trough all games
    for (var gameName in this.progressData) {
      //console.log('max ' + getGameLetterMax(gameName,letter));
      //console.log('done ' + getGameLetterAchieved(gameName,letter));
      assignmentsTotal += this.getGameLetterMax(gameName, letter);
      assigmentsPassed += this.getGameLetterAchieved(gameName, letter);
    }
    //console.log('max ' + assignmentsTotal);
    //console.log('done ' + assigmentsPassed);
    //console.log('done %' + getPercent(assigmentsPassed,assignmentsTotal));
    return this.getPercent(assigmentsPassed, assignmentsTotal);
  }

  getPercent(done, max) {
    if (max != 0) {
      return Math.round(done * 100 / max);
    } else {
      return 50;
    }
  }

  handleProgressActions(letter, gameName, id) {
    // if letter contains a space this won't work!
    // Nayla's request to assign a game to two letters made this occur
    // maybe it will work for an _? (but the how to retreive it?)
    letter = letter.substr(0, 1);
    var phoneticLetter = this.arabCharacterService.getPhonetic(letter);
    if (this.availableGames[phoneticLetter] === undefined) {
      console.log('error in data for letter ' + letter);
      console.log('error in data for letter ' + gameName);
      console.log('error in data for letter ' + id);
    } else {
      //console.log("Register " + gameName + " for " + phoneticLetter);
      //console.log($rootScope.this.availableGames);
      this.availableGames[phoneticLetter][gameName] = 1;
      //console.log("done");
    }

    //console.log(storedProgress);
    if (this.storedProgress[gameName] == undefined || this.storedProgress[gameName][phoneticLetter] == undefined || this.storedProgress[gameName][phoneticLetter][id] == undefined) {
      //console.log("undef");
      this.setAssignmentProgress(gameName, phoneticLetter, id, 0, false);
    } else {
      //console.log("def");
      this.setAssignmentProgress(gameName, phoneticLetter, id, this.storedProgress[gameName][phoneticLetter][id], false);
    }
  }
}
