import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { leveltestPage } from './leveltest.page';

const routes: Routes = [
  {
    path: '',
    component: leveltestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class leveltestRoutingModule {}
