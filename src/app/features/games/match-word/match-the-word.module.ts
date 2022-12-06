import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { MatchTheWordRoutingModule } from './match-the-word.routing';

import { MatchTheWordPage } from './match-the-word.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    MatchTheWordRoutingModule
  ],
  declarations: [MatchTheWordPage]
})
export class MatchTheWordModule {}
