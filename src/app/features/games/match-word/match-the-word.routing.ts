import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchTheWordPage } from './match-the-word.page';

const routes: Routes = [
  {
    path: '',
    component: MatchTheWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchTheWordRoutingModule {}
