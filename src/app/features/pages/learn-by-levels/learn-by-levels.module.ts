import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LearnByLevelsRoutingModule } from './learn-by-levels.routing';

import { LearnByLevelsPage } from './learn-by-levels.page';

@NgModule({
  imports: [
    SharedModule,
    LearnByLevelsRoutingModule
  ],
  declarations: [LearnByLevelsPage]
})
export class LearnByLevelsModule {}
