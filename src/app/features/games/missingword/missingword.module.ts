import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/shared/shared.module';
import { MissingWordRoutingModule} from './missingword.routing';

import { MissingWordPage }  from './missingword.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    MissingWordRoutingModule
  ],
  declarations: [MissingWordPage]
})
export class  MissingWordModule {}
