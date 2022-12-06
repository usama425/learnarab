import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { OrderBookRoutingModule } from './order-book.routing';

import { OrderBookPage } from './order-book.page';

@NgModule({
  imports: [
    IonicModule,
    SharedModule,

    OrderBookRoutingModule
  ],
  declarations: [OrderBookPage]
})
export class OrderBookModule {}
