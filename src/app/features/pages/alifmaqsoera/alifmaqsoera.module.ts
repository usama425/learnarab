import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { AlifmaqsoeraRoutingModule } from './alifmaqsoera.routing';

import { AlifmaqsoeraPage } from './alifmaqsoera.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    AlifmaqsoeraRoutingModule
  ],
  declarations: [AlifmaqsoeraPage]
})
export class AlifmaqsoeraModule {}
