import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Media } from '@ionic-native/media/ngx';

import { AdMobFree } from '@ionic-native/admob-free/ngx';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';

import { services } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    InAppBrowser,
    InAppPurchase2,
    AppRate,
    Media,
    AdMobFree,
    
    ...services
  ]
})
export class CoreModule { 
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
