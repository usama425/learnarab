import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { ListenAndPickRoutingModule } from './listen-and-pick.routing';

import { ListenAndPickPage } from './listen-and-pick.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    ListenAndPickRoutingModule
  ],
  declarations: [ListenAndPickPage]
})
export class ListenAndPickModule {}
