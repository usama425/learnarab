import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateSentenceRoutingModule } from './translatesentence.routing';

import { TranslateSentencePage } from './translatesentence.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    TranslateSentenceRoutingModule
  ],
  declarations: [TranslateSentencePage]
})
export class TranslateSentenceModule {}
