import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, EventService, TimerService } from 'src/app/core/services';
import { SwipeDirection } from 'src/app/core/enums';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit {
  _gameInfoActive: boolean = false;
  @Output() toggleInfo = new EventEmitter();

  @Input() pageSlug: string;
  @Input()
  get gameInfoActive(): boolean {
    return this._gameInfoActive
  }
  set gameInfoActive(value: boolean) {
    if (value) {
      this.infoVisible();
    } else {
      this.infoHidden();
    }

    this._gameInfoActive = value;
  }

  gameInfoTextSource: object = {};
  gameInfoSpecialCode: string;

  
  heightStyle: object = {};

  constructor(
    private dataService: DataService,
    private timerService: TimerService,
    private eventService: EventService
  ) {
    this.eventService.onHelpClicked.subscribe(text => {
      this.gameInfoSpecialCode = text;
      this.toggleInfo.emit();
    })
  }

  ngOnInit() {
    this.dataService.getGameInfo().subscribe(data => {
      data.forEach(gameObj => {
        const { screen, helptext } = gameObj.meta;
        this.gameInfoTextSource[screen] = helptext;
      });
    });
  }

  infoHidden() {
    this.gameInfoSpecialCode = null;
    if (this.pageSlug !== 'readandlearn') this.timerService.start();
  }

  infoVisible() {
    const headerHeight = (document.querySelector('pages-header > ion-toolbar') as HTMLElement).offsetHeight;
    this.heightStyle = { height: `calc(100vh - ${headerHeight}px)` };

    this.timerService.pause();
  }

  switch(e) {
    this.toggleInfo.emit();
  }

  swipe(e) {
    //if (e.direction == SwipeDirection.DIRECTION_UP) this.switch(e);
  }

  getGameInfoText(pageSlug) {
    let infoText = this.gameInfoTextSource[pageSlug];
    return infoText ? infoText : '<p class="not-help">No helptext available</p>';
  }

  get gameInfoText() {
    let key = this.gameInfoSpecialCode ? this.gameInfoSpecialCode : this.pageSlug;
    return this.getGameInfoText(key);
  }
}
