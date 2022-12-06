import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderBookPage } from './order-book.page';

const routes: Routes = [
  {
    path: '',
    component: OrderBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderBookRoutingModule {}
