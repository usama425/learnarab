import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';
import { LevelsRoutingModule } from './levels.routing';

import { LevelsPage } from './levels.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    LevelsRoutingModule
  ],
  declarations: [LevelsPage]
})
export class LevelsModule {}
