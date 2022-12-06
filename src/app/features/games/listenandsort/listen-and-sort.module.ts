import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { ListenAndSortRoutingModule } from './listen-and-sort.routing';

import { ListenAndSortPage } from './listen-and-sort.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    ListenAndSortRoutingModule
  ],
  declarations: [ListenAndSortPage]
})
export class ListenAndSortModule {}
