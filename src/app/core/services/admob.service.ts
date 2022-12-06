import { Injectable } from "@angular/core";
//IMPORT PLATFORM SO WE CAN START ADMOB AS SOON AS IT'S READY.
import { Platform } from "@ionic/angular";
//IMPORT WHAT WE NEED FROM ADMOBFREE PLUGIN.
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig,
} from "@ionic-native/admob-free/ngx";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class AdmobService {
  private adMobIds: any = {};
  private testMode: boolean = false;

  //BANNER CONFIG
  private bannerConfig: AdMobFreeBannerConfig = {
    isTesting: this.testMode, // KEEP DURING CODING, REMOVE AT PROD.
    autoShow: true,
  };

  //INTERSTITIAL CONFIG
  private interstitialConfig: AdMobFreeInterstitialConfig = {
    isTesting: this.testMode, // KEEP DURING CODING, REMOVE AT PROD.
    autoShow: false,
    //id: "ID GENERATED AT ADMOB ca-app-pub FOR PROD"
  };

  //REWARD VIDEO CONFIG.
  private rewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: this.testMode, // KEEP DURING CODING, REMOVE AT PROD.
    autoShow: false, //,
    //id: "ID GENERATED AT ADMOB ca-app-pub FOR PROD"
  };

  //ADD PLATFORM Y ADMOB AT CONSTRUCTOR.
  constructor(public platform: Platform, private admobFree: AdMobFree) {
    //LOAD ADS AT PLATFORM READY PROMISE.
    this.platform.ready().then(() => {
      if (!this.testMode) {
        this.adMobIds = this.platform.is("android")
          ? environment.admob.android
          : environment.admob.ios;

        // Setting Ids
        this.bannerConfig.id = this.adMobIds.adMobBannerUnitId;
        this.interstitialConfig.id = this.adMobIds.adMobInterestialUnitId;
        this.rewardVideoConfig.id = this.adMobIds.adMobRewardedUnitId;
      }

      //BANNER
      this.admobFree.banner.config(this.bannerConfig);

      //INTERSTITIAL
      // 1. Coniguration (Only first time)
      this.admobFree.interstitial.config(this.interstitialConfig);
      // 2. Prepare (Everytime after close)
      this.preapreInterstitial();

      //REWARD VIDEO
      // 1. Coniguration (Only first time)
      this.admobFree.rewardVideo.config(this.rewardVideoConfig);
      // 2. Prepare (Everytime after close)
      this.preapreRewardVideo();
    });

    //Handle interstitial's close event to Prepare Ad again
    this.admobFree
      .on(this.admobFree.events.INTERSTITIAL_CLOSE)
      .subscribe(() => {
        console.log("INTERSTIAL CLOSED");
        this.preapreInterstitial();
      });

    // //Handle Reward's close event to Prepare Ad again
    this.admobFree
      .on(this.admobFree.events.REWARD_VIDEO_CLOSE)
      .subscribe(() => {
        console.log("REWARD VIDEO CLOSED");
        this.preapreRewardVideo();
      });
  }

  private preapreInterstitial() {
    this.admobFree.interstitial
      .prepare()
      .then(() => {
        console.log("INTERSTIAL LOADED");
      })
      .catch((e) => console.log("PROBLEM LOADING INTERSTITIAL: ", e));
  }

  private preapreRewardVideo() {
    this.admobFree.rewardVideo
      .prepare()
      .then(() => {
        console.log("REWARD VIDEO Prepared");
      })
      .catch((e) => console.log("PROBLEM LOADING REWARDVIDEO: ", e));
  }

  showBanner() {
    //CHECK AND SHOW BANNER
    this.admobFree.banner
      .prepare()
      .then(() => {
        console.log("BANNER LOADED 1");
      })
      .catch((e) => console.log("PROBLEM LOADING BANNER: ", e));
  }

  showInterstitial() {
    //CHECK AND SHOW INTERSTITIAL
    this.admobFree.interstitial
      .isReady()
      .then(() => {
        //AT .ISREADY SHOW
        this.admobFree.interstitial
          .show()
          .then(() => {
            console.log("INTERSTITIAL LOADED");
          })
          .catch((e) =>
            console.log("PROBLEM LOADING REWARD VIDEO (SHOW): ", e)
          );
      })
      .catch((e) => console.log("PROBLEM LOADING REWARD VIDEO (ISREADY): ", e));
  }

  showRewardVideo() {
    //CHECK AND SHOW REWARDVIDEO
    this.admobFree.rewardVideo
      .isReady()
      .then(() => {
        //AT .ISREADY SHOW
        console.log("Reward Video initiate");
        this.admobFree.rewardVideo
          .show()
          .then(() => {
            console.log("Reward Video LOADED");
            this.preapreRewardVideo();
          })
          .catch((e) => {
            console.log("PROBLEM LOADING REWARD VIDEO (SHOW): ", e);
            this.preapreRewardVideo();
          });
      })
      .catch((e) => {
        console.log("PROBLEM LOADING REWARD VIDEO (ISREADY): ", e);
        this.preapreRewardVideo();
      });
  }
}
