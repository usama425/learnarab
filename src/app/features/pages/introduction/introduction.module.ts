import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { IntroductionRoutingModule } from './introduction.routing';

import { IntroductionPage } from './introduction.page';

@NgModule({
  imports: [
    IonicModule,
    SharedModule,

    IntroductionRoutingModule
  ],
  declarations: [IntroductionPage]
})
export class IntroductionModule {}
