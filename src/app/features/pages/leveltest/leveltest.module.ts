import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { leveltestRoutingModule } from './leveltest.routing';

import { leveltestPage } from './leveltest.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    leveltestRoutingModule
  ],
  declarations: [leveltestPage]
})
export class leveltestModule {}
