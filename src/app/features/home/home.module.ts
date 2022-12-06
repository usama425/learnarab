import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomePage } from './home.page';

import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [HomePage]
})
export class HomeModule {}
