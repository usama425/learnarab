import { Component, OnInit, Input } from '@angular/core';
import { ShowScore } from 'src/app/core/models';
import { ProgressDataService, EventService } from 'src/app/core/services';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-score-info',
  templateUrl: './score-info.component.html',
  styleUrls: ['./score-info.component.scss'],
})
export class ScoreInfoComponent implements OnInit {
  @Input() data: ShowScore;

  dataLoaded: boolean;
  progressValue: number = 0;
  gameScore: number;
  maxScore: number;

  constructor(
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    private eventService: EventService,
    private progressDataService: ProgressDataService
  ) { }

  ngOnInit() {
    this.dataLoaded = false;
    const { gameName, letter } = this.data;

    this.gameScore = this.progressDataService.getGameLetterAchieved(gameName, letter);
    this.maxScore = this.progressDataService.getGameLetterMax(gameName, letter);
    this.progressValue = Math.round((this.gameScore / this.maxScore) * 100);

    this.dataLoaded = true;
  }

  replayGame() {
    this.closeModal();
    this.eventService.triggerReplay();
  };

  back() {
    this.closeModal();
    this.navCtrl.pop();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }



}
