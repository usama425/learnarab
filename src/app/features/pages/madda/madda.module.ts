import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { MaddaRoutingModule } from './madda.routing';

import { MaddaPage } from './madda.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    MaddaRoutingModule
  ],
  declarations: [MaddaPage]
})
export class MaddaModule {}
