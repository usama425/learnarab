import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

import { PagesRoutingModule } from './pages.routing';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [    
    SharedModule,
    PagesRoutingModule
  ], providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class PagesModule { }
