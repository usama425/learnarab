import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnByLevelsPage } from './learn-by-levels.page';

const routes: Routes = [
  {
    path: '',
    component: LearnByLevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnByLevelsRoutingModule {}
