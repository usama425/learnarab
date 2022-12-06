import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { LearnVowelsRoutingModule } from './learn-vowels.routing';

import { LearnVowelsPage } from './learn-vowels.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    LearnVowelsRoutingModule
  ],
  declarations: [LearnVowelsPage]
})
export class LearnVowelsModule {}
