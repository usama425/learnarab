import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';


import { Subscription } from 'rxjs';

import { SettingsDataService, ProgressDataService, DataService, LocalStorageService, UtilityService } from './core/services';
import { NavigationStart, Router } from '@angular/router';
// import { Network } from '@ionic-native/network/ngx';

import { NetworkStatus, PluginListenerHandle, Plugins } from '@capacitor/core';
const { App, SplashScreen, Network } = Plugins;

@Component({
  selector: 'app-root',
  template: `<ion-app>
              <ion-router-outlet #router="outlet"></ion-router-outlet>
            </ion-app>`
})
export class AppComponent {
  @ViewChild('router', { static: true })
  private routerOutlet: IonRouterOutlet;
  
  settings: any = {};
  settingsSub: Subscription;

  progress: any = {};
  progressSub: Subscription;

  networkStatusListener: PluginListenerHandle;
  alert: HTMLIonAlertElement;

  routerSub$: Subscription;
  platformPauseSub$: Subscription;

  constructor(
    private platform: Platform,
    private diagnostic: Diagnostic,
    private statusBar: StatusBar,
    private appRate: AppRate,
    private router: Router,
    private navCtrl: NavController,
    public alertController: AlertController,
    private dataService: DataService,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
    private settingsDataService: SettingsDataService,
    private progressDataService: ProgressDataService,
  ) {
    this.routerSub$ = this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.utilityService.stopAudio(); // Stop Audio on hardware back
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //alert('$ionicPlatform.ready()');
      this.statusBar.styleDefault();

      this.initializeAppRating();
      if (this.platform.is("android")) {
        this.diagnostic.requestExternalStorageAuthorization().then(() => {
          //User gave permission 
          this.loadApplicationData();
        }).catch(error=>{
           //Handle error
        });
      } else {
        this.loadApplicationData();
      }

      this.registerHardwareBackButton();

      // Listerner for minize event of app
      this.platformPauseSub$ = this.platform.pause.subscribe(() => {
        this.utilityService.stopAudio();
      });
    });

  }
  

  loadApplicationData() {
    this.dataService.getGeneralInfo().subscribe(data => {
      /* Store Default Application Data */
      this.localStorageService.storeApplicationData(data);

      /* Load Application Local Data */
      this.loadLocalApplicationData();
    });
  }

  loadLocalApplicationData() {
    //alert('application launched');

    if (this.settingsLoaded && this.progressLoaded) {
      this.startApplication();
    } else {
      this.settingsSub = this.settingsDataService.subscribe((settings: any) => {
        //alert('settings Loaded')
        this.settings = settings;

        if (this.progressLoaded) {
          this.startApplication();
        }
      });

      this.progressSub = this.progressDataService.subscribe((progress: any) => {
        //alert('progress launched')

        this.progress = progress;

        if (this.settingsLoaded) {
          this.startApplication();
        }
      });

      /** Load Application Data **/
      this.settingsDataService.initSettings();
      this.progressDataService.initProgress();
    }
  }

  initializeAppRating() {
    this.appRate.preferences = {
      displayAppName: 'Learnarab',
      usesUntilPrompt: 2,
      promptAgainForEachNewVersion: true,
      storeAppURL: {
        ios: '1156484073', // 1222926795
        android: 'market://details?id=com.imasterarabic.learnarab'
      },
      customLocale: {
        title: "",
        message: "It would be great if you could rate it!",
        cancelButtonLabel: "No thanks",
        laterButtonLabel: "Later",
        rateButtonLabel: "Sure, I'll rate",
        yesButtonLabel: "Yes!",
        noButtonLabel: "Not really",
        appRatePromptTitle: 'Enjoying Learnarab?',
        feedbackPromptTitle: 'Mind giving us some feedback?',
      },
      callbacks: {
        onButtonClicked: function (buttonIndex, curBut, butInfo) {
          console.log("onButtonClicked -> " + buttonIndex);
          console.log("onButtonClicked -> " + curBut);
          console.log("onButtonClicked -> " + butInfo);
          if (buttonIndex == 1 && curBut == "Not really") {
            this.appRate.myUpdateCounter('reset');
          }
        }
      }
    };

    this.appRate.promptForRating(false);
  }

  async startApplication() {
    debugger;
    //alert("splash screen hiding")
    await SplashScreen.hide();

    setTimeout(() => {
      this.registerNetworkEvents();
    }, 2000);
  }

  async registerNetworkEvents () {
    this.networkStatusListener = Network.addListener('networkStatusChange', (status) => {
      //alert("Network status changed" + JSON.stringify(status));
      this.handleNetworkStatusChange(status);

    });

    // Get the current network status
    let status = await Network.getStatus();
    this.handleNetworkStatusChange(status);
    
    //alert("Network status changed" + JSON.stringify(status));

  }

  handleNetworkStatusChange(status: NetworkStatus) {
    if(status.connected) {
      if(this.alert)  {
        this.alert.dismiss();
        this.alert = null;
      }
    } else {
      this.presentAlert("Oops", "No internet connection", "Quit")
    }
  }

  registerHardwareBackButton() {
    this.platform.backButton.subscribe((e) => {
      this.utilityService.stopAudio(); // Stop Audio on hardware back
      
      if (!this.routerOutlet.canGoBack()) {
        // quit application
        //alert("let's quit");
        App.exitApp();
      } else {
        //this.navCtrl.back();
      }
    });
  }

  async presentAlert(header, message, buttontext) {
    this.alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss: false,
      buttons: [{
        text: buttontext,
        handler: () => {
          App.exitApp();
        }
      }]
    });

    await this.alert.present();
  }

  get isHomePageUrl() {
    return this.router.url == '/home';
  }

  get settingsLoaded() {
    return this.settingsDataService.settingsLoaded;
  }

  get progressLoaded() {
    return this.progressDataService.progressLoaded;
  }

  ngOnDestroy() {
    this.routerSub$.unsubscribe();
    if (this.platformPauseSub$) this.platformPauseSub$.unsubscribe();
    
    this.settingsSub.unsubscribe();
    this.progressSub.unsubscribe();
    this.networkStatusListener.remove();
  }
}
