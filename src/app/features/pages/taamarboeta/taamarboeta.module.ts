import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { TaamarboetaRoutingModule } from './taamarboeta.routing';

import { TaamarboetaPage } from './taamarboeta.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    TaamarboetaRoutingModule
  ],
  declarations: [TaamarboetaPage]
})
export class TaamarboetaModule {}
