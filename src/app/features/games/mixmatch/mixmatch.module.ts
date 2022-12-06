import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { MixMatchRoutingModule } from './mixmatch.routing';

import { MixMatchPage } from './mixmatch.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    MixMatchRoutingModule
  ],
  declarations: [MixMatchPage]
})
export class MixMatchModule {}
