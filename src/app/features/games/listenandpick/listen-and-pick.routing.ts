import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListenAndPickPage } from './listen-and-pick.page';

const routes: Routes = [
  {
    path: '',
    component: ListenAndPickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenAndPickRoutingModule {}
