import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { UtilityService, EventService, TimerService } from 'src/app/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  currentColor: string = "#8DC63F";
  tickTickSound: MediaObject;

  startTickingSub$: Subscription;
  stopTickingSub$: Subscription;
  colorChangedSub$: Subscription;
  volumeChangedSub$: Subscription;

  constructor(
    private media: Media,
    private timerService: TimerService,
    private eventService: EventService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    let soundPath = this.utilityService.completeServerUrl('/appsound/tick.mp3');
    this.tickTickSound = this.media.create(soundPath);

    this.attachEvents();
  }

  attachEvents() {
    this.startTickingSub$ = this.eventService.onStartTicking.subscribe(result => {
      this.tickTickSound.setVolume(0);
      this.tickTickSound.play();
    });

    this.stopTickingSub$ = this.eventService.onStopTicking.subscribe(result => {
      this.tickTickSound.stop();
    });

    this.colorChangedSub$ = this.eventService.onColorChanged.subscribe(color => {
      this.currentColor = color;
    });

    this.volumeChangedSub$ = this.eventService.onVolumeChanged.subscribe(volume => {
      this.tickTickSound.setVolume(volume * 0.15);
    });
  }

  get current() {
    return this.timerService.timerCount;
  }

  get timeSet() {
    return this.timerService.timeSet;
  }

  ngOnDestroy() {
    this.startTickingSub$.unsubscribe();
    this.stopTickingSub$.unsubscribe();
    this.colorChangedSub$.unsubscribe();
    this.volumeChangedSub$.unsubscribe();
  }
}
