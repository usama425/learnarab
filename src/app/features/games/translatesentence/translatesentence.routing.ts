import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateSentencePage } from './translatesentence.page';

const routes: Routes = [
  {
    path: '',
    component: TranslateSentencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslateSentenceRoutingModule {}
