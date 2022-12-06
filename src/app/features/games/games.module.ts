import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

import { GamesRoutingModule } from './games.routing';

import { SharedModule } from 'src/app/shared/shared.module';

import { BaseGameComponent } from './base/base-game.component';

@NgModule({
  declarations: [
    BaseGameComponent
  ],
  imports: [    
    SharedModule,
    GamesRoutingModule
  ], providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class GamesModule { }
