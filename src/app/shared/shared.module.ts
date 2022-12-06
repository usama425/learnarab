import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { PinchZoomModule } from 'ngx-pinch-zoom';

import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { GameInfoComponent } from './components/game-info/game-info.component';
import { ScoreInfoComponent } from './components/score-info/score-info.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TimerComponent } from './components/timer/timer.component';
import { PadPipe } from './pipes/pad.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    GameInfoComponent,
    ScoreInfoComponent,
    ProgressBarComponent,
    TimerComponent,

    PadPipe,
    SafeUrlPipe
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DragulaModule.forRoot(),
    PinchZoomModule,

    RoundProgressModule
  ],
  exports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DragulaModule,
    PinchZoomModule,

    RoundProgressModule,

    GameInfoComponent,
    ScoreInfoComponent,
    ProgressBarComponent,
    TimerComponent,

    PadPipe,
    SafeUrlPipe
  ],
  entryComponents: [
    ScoreInfoComponent
  ]
})
export class SharedModule { }
