import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { BuyRoutingModule } from './buy.routing';

import { BuyPage } from './buy.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    BuyRoutingModule
  ],
  declarations: [BuyPage]
})
export class BuyModule {}
