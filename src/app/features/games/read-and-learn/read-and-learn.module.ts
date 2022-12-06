import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { ReanAndLearnRoutingModule } from './read-and-learn.routing';

import { ReanAndLearnPage } from './read-and-learn.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    ReanAndLearnRoutingModule
  ],
  declarations: [ReanAndLearnPage]
})
export class ReanAndLearnModule {}
