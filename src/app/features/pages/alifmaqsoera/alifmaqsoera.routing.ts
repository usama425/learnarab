import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlifmaqsoeraPage } from './alifmaqsoera.page';

const routes: Routes = [
  {
    path: '',
    component: AlifmaqsoeraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlifmaqsoeraRoutingModule {}
