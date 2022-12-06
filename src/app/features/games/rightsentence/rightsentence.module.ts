import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { RightSentenceRoutingModule } from './rightsentence.routing';

import { RightSentencePage } from './rightsentence.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    RightSentenceRoutingModule
  ],
  declarations: [RightSentencePage]
})
export class RightSentenceModule {}
