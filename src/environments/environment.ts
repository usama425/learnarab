// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  debugMode: false,
  baseApiUrl: "https://enteetweeonderwijs.nl/data",

  admob: {
    android: {
      adMobAppId: "ca-app-pub-1240659540945215~2371246078",
      adMobBannerUnitId: "ca-app-pub-1240659540945215/5767226299",
      adMobInterestialUnitId: "ca-app-pub-1240659540945215/2691502203",
      adMobRewardedUnitId: "ca-app-pub-1240659540945215/9404126506",
    },
    ios: {
      adMobAppId: "ca-app-pub-1240659540945215~5927347703",
      adMobBannerUnitId: "ca-app-pub-1240659540945215/1623682714",
      adMobInterestialUnitId: "ca-app-pub-1240659540945215/2006826091",
      adMobRewardedUnitId: "ca-app-pub-1240659540945215/3675130989",
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
