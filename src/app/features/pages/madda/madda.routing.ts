import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaddaPage } from './madda.page';

const routes: Routes = [
  {
    path: '',
    component: MaddaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaddaRoutingModule {}
