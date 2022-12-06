import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { AboutUsRoutingModule } from './about-us.routing';

import { AboutUsPage } from './about-us.page';



@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    AboutUsRoutingModule
  ],
  declarations: [AboutUsPage]
})
export class AboutUsModule {}
