import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouteData } from 'src/app/core/models/route-data.model';
import { NavController } from '@ionic/angular';
import { EventService } from 'src/app/core/services';

@Component({
  selector: 'pages-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() routeData: RouteData;
  @Input() gameInfoActive: boolean;
  @Input() currentScore: number =  0;
  @Output() toggleInfo = new EventEmitter();
  @Output() onScrollTop = new EventEmitter();

  showFavorites: boolean = false;
  shuffleWords: boolean = false;
  showArabicWords: boolean = false;

  constructor(
    private navCtrl: NavController,
    private eventService: EventService
  ) { }

  goBack() {
    this.eventService.triggerBack();
    if(this.gameInfoActive) this.toggleInfo.emit();
    this.navCtrl.pop();
  }

  switchShowFavorites(){
    this.showFavorites = !this.showFavorites;
    this.eventService.triggerFavorite(this.showFavorites);
    this.onScrollTop.emit();
  };

  switchShuffleWords(){
    this.shuffleWords = !this.shuffleWords;
    this.eventService.triggerSuffle(this.shuffleWords);
  }
  
  switchCards(){
    this.showArabicWords = !this.showArabicWords;
    this.eventService.triggerTurnCard(this.showArabicWords);
  }

  get backIcon() {
    return this.routeData && this.routeData.directPage ? "menu" : "chevron-back";
  }

  get wordIconClass() {
    return this.showArabicWords ? "green" : "white";
  }

  get shuffleIconClass() {
    return this.shuffleWords ? "green" : "white";
  }

  get favoriteIconClass() {
    return this.showFavorites ? "green" : "white";
  }
}
