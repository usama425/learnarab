import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RightSentencePage } from './rightsentence.page';

const routes: Routes = [
  {
    path: '',
    component: RightSentencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RightSentenceRoutingModule {}
