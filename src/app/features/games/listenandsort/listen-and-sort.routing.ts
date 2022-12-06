import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListenAndSortPage } from './listen-and-sort.page';

const routes: Routes = [
  {
    path: '',
    component: ListenAndSortPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenAndSortRoutingModule {}
