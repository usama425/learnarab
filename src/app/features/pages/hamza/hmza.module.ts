import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { HmzaRoutingModule } from './hmza.routing';

import { HmzaPage } from './hmza.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    HmzaRoutingModule
  ],
  declarations: [HmzaPage]
})
export class HmzaModule {}
