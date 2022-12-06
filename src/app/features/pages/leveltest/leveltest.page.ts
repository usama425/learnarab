import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router';
import { ArabCharacterService, ProgressDataService } from 'src/app/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leveltest',
  templateUrl: './leveltest.page.html',
  styleUrls: ['./leveltest.page.scss']
})
export class leveltestPage implements OnInit {
  letter: string;
  letterPhonetic: string;
  letterInfoLink: string;

  matchword: number = 0;
  matchingletter: number = 0;
  mixnmatch: number = 0;
  wordpuzzle: number = 0;
  listenandpick: number = 0;
  missingword: number = 0;
  listennsort: number = 0;
  rightsentencepick: number = 0;
  rightsentencesort: number = 0;

  matchwordAvailable: boolean;
  matchingletterAvailable: boolean;
  missingwordAvailable: boolean;
  translatesentenceAvailable: boolean;
  wordpuzzleAvailable: boolean;
  mixandmatchAvailable: boolean;
  rightsentenceAvailable: boolean;
  listennsortAvailable: boolean;
  listennpickAvailable: boolean;

  progressSub$: Subscription;
  routeParamSub$: Subscription;

  constructor(private route: ActivatedRoute, public alertController: AlertController,
    private arabCharacterService: ArabCharacterService,
    private progressDataService: ProgressDataService
  ) {

  }

  ngOnInit() {
    this.progressSub$ = this.progressDataService.subscribe((progress: any) => {
      this.setAvailableGamesForLetter();
    });

    this.routeParamSub$ = this.route.params.subscribe(params => {
      const { letter } = params;
      this.letter = letter;
      this.letterInfoLink = `/pages/learn/${letter}`;
      this.letterPhonetic = this.arabCharacterService.getPhonetic(this.letter);
      this.processLevels();
    });
  }


  processLevels() {
    const { progressLoaded } = this.progressDataService;

    switch (this.letterPhonetic) {
      case 'madda':
        this.letterInfoLink = '/pages/madda';
        break;

      case 'alif maqsura':
        this.letterInfoLink = '/pages/alifmaqsoera';
        break;

      case 'hamza':
        this.letterInfoLink = '/pages/hamza';
        break;

      case 'taa marbuta':
        this.letterInfoLink = '/pages/taamarboeta';
        break;
    }
    if (progressLoaded) {
      this.setAvailableGamesForLetter();
    }

  }

  setAvailableGamesForLetter() {
    const { availableGames } = this.progressDataService;
    // let availableGames;

    if (availableGames[this.letterPhonetic]['matchword'] != undefined)
      this.matchword = this.progressDataService.getGameLetterProgress('matchword', this.letter);
    if (availableGames[this.letterPhonetic]['matchingletter'] != undefined)
      this.matchingletter = this.progressDataService.getGameLetterProgress('matchingletter', this.letter);
    if (availableGames[this.letterPhonetic]['mixnmatch3'] != undefined)
      this.mixnmatch = this.progressDataService.getGameLetterProgress('mixnmatch3', this.letter);

    if (availableGames[this.letterPhonetic]['wordpuzzle'] != undefined)
      this.wordpuzzle = this.progressDataService.getGameLetterProgress('wordpuzzle', this.letter);
    if (availableGames[this.letterPhonetic]['listenandpick'] != undefined)
      this.listenandpick = this.progressDataService.getGameLetterProgress('listenandpick', this.letter);
    if (availableGames[this.letterPhonetic]['missingword'] != undefined)
      this.missingword = this.progressDataService.getGameLetterProgress('missingword', this.letter);

    if (availableGames[this.letterPhonetic]['listenandsort'] != undefined)
      this.listennsort = this.progressDataService.getGameLetterProgress('listenandsort', this.letter);
    if (availableGames[this.letterPhonetic]['rightsentencepick'] != undefined)
      this.rightsentencepick = this.progressDataService.getGameLetterProgress('rightsentencepick', this.letter);
    if (availableGames[this.letterPhonetic]['rightsentencesort'] != undefined)
      this.rightsentencesort = this.progressDataService.getGameLetterProgress('rightsentencesort', this.letter);

    this.matchwordAvailable = (availableGames[this.letterPhonetic]['matchword'] != undefined);
    this.matchingletterAvailable = (availableGames[this.letterPhonetic]['matchingletter'] != undefined);
    this.missingwordAvailable = (availableGames[this.letterPhonetic]['missingword'] != undefined);
    this.translatesentenceAvailable = (availableGames[this.letterPhonetic]['rightsentencepick'] != undefined);
    this.wordpuzzleAvailable = (availableGames[this.letterPhonetic]['wordpuzzle'] != undefined);
    this.mixandmatchAvailable = (availableGames[this.letterPhonetic]['mixnmatch3'] != undefined);
    this.rightsentenceAvailable = (availableGames[this.letterPhonetic]['rightsentencesort'] != undefined);
    this.listennsortAvailable = (availableGames[this.letterPhonetic]['listenandsort'] != undefined);
    this.listennpickAvailable = (availableGames[this.letterPhonetic]['listenandpick'] != undefined);
  }

  ngOnDestroy() {
    this.routeParamSub$.unsubscribe();
    this.progressSub$.unsubscribe();
  }

}
