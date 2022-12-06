import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShowScore } from '../models/show-score.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  onBackClicked = new Subject<boolean>();
  onFavoriteClicked = new Subject<boolean>();
  onShuffleClicked = new Subject<boolean>();
  onTurnCardClicked = new Subject<boolean>();
  onHelpClicked = new Subject<string>();
  onVolumeChanged = new Subject<number>();
  onColorChanged = new Subject<string>();
  onStartTicking = new Subject<boolean>();
  onStopTicking = new Subject<boolean>();
  onScoreChanged = new Subject<number>();
  onReplay = new Subject<boolean>();
  onGameEnd = new Subject<boolean>();

  constructor() { }
  
  triggerBack() {
    this.onBackClicked.next(true);
  }

  triggerHelp(text: string) {
    this.onHelpClicked.next(text);
  }

  triggerFavorite(value: boolean) {
    this.onFavoriteClicked.next(value);
  }

  triggerSuffle(value: boolean) {
    this.onShuffleClicked.next(value);
  }

  triggerTurnCard(value: boolean) {
    this.onTurnCardClicked.next(value);
  }

  triggerStartTicking() {
    this.onStartTicking.next(true);
  }

  triggerStopTicking() {
    this.onStopTicking.next(true);
  }

  triggerVolume(volume: number) {
    this.onVolumeChanged.next(volume);
  }
  
  triggerColor(colorCode: string) {
    this.onColorChanged.next(colorCode);
  }

  triggerScore(score: number) {
    this.onScoreChanged.next(score);
  }

  triggerReplay() {
    this.onReplay.next(true);
  }

  triggerGameEnd() {
    this.onGameEnd.next(true);
  }

}
