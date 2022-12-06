import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HmzaPage } from './hmza.page';

const routes: Routes = [
  {
    path: '',
    component: HmzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HmzaRoutingModule {}
