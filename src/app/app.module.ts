import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './shared/layout/layout.module';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    
    CoreModule,
    LayoutModule,
    AppRoutingModule
  ],
  providers: [
    Diagnostic,
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
