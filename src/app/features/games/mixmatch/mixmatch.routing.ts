import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MixMatchPage } from './mixmatch.page';

const routes: Routes = [
  {
    path: '',
    component: MixMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MixMatchRoutingModule {}
