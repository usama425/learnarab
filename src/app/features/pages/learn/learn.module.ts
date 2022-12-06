import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { LearnRoutingModule } from './learn.routing';

import { LearnPage } from './learn.page';

import { InstructionModalComponent } from './instruction-modal/instruction-modal.component';

@NgModule({
  imports: [
    IonicModule,
    SharedModule,

    LearnRoutingModule
  ],
  declarations: [
    LearnPage,

    InstructionModalComponent
  ],
  entryComponents: [
    InstructionModalComponent
  ]
})
export class LearnModule {}
