import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaamarboetaPage } from './taamarboeta.page';

const routes: Routes = [
  {
    path: '',
    component: TaamarboetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaamarboetaRoutingModule {}
