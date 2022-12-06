import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { MatchingLetterRoutingModule } from './matching-letter.routing';

import { MatchingLetterPage } from './matching-letter.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    MatchingLetterRoutingModule
  ],
  declarations: [MatchingLetterPage]
})
export class MatchingLetterModule {}
