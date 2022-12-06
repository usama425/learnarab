import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutPage } from './layout.page';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    LayoutPage,
    HeaderComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LayoutPage
  ]
})
export class LayoutModule { }
