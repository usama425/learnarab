import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnVowelsPage } from './learn-vowels.page';

const routes: Routes = [
  {
    path: '',
    component: LearnVowelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnVowelsRoutingModule {}
