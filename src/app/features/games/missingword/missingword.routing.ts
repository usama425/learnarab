import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissingWordPage } from './missingword.page';

const routes: Routes = [
  {
    path: '',
    component: MissingWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissingWordRoutingModule {}
