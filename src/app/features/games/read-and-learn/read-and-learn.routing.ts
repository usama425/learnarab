import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReanAndLearnPage } from './read-and-learn.page';

const routes: Routes = [
  {
    path: '',
    component: ReanAndLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReanAndLearnRoutingModule {}
