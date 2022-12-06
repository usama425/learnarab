import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';

import { AlertController, Platform } from '@ionic/angular'
import { UtilityService, SettingsDataService } from 'src/app/core/services';
import { Router } from '@angular/router';

const LEARNARAB_FULL_VERSION = 'learnarab_full_version';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss']
})
export class BuyPage {
  buying: boolean = false;
  appAlreadyPurchased: boolean = false;
  debugMode: boolean = false;
  products: IAPProduct[] = [];

  constructor(
    private platform: Platform,
    private router: Router,
    private store: InAppPurchase2,
    private ref: ChangeDetectorRef,
    public alertController: AlertController,
    private settingsDataService: SettingsDataService
  ) {
    this.platform.ready().then(() => {
      // Only for debugging!
      // this.store.verbosity = this.store.DEBUG;

      this.registerProducts();
      this.setupListeners();

      // Get the real product information
      this.store.ready(() => {
        setTimeout(() => {
          this.products = this.store.products;
          this.ref.detectChanges();
        }, 2000);
      });
    });
  }

  registerProducts() {
    this.store.register({
      id: LEARNARAB_FULL_VERSION,
      type: this.store.NON_CONSUMABLE,
    });

    this.store.refresh();
  }

  setupListeners() {
    // General query to all products
    this.store.when(LEARNARAB_FULL_VERSION)
      .approved((p: IAPProduct) => {
        console.log("Approved alert success");
        return p.verify();
      })
      .verified((p: IAPProduct) => {
        console.log("Verified alert success")
        p.finish();
      })
      .owned((product: IAPProduct) => {
        console.log("Owned alert success ==>" + JSON.stringify(product));
        this.appAlreadyPurchased = true;

        if (this.buying) {
          this.activateFullVersion();
          this.ref.detectChanges();
          this.presentAlert('Success', 'Thank you for purchasing LearnArab app.', 'OK', true);
        }
      })
      .updated((product: IAPProduct) => {
        console.log('updation ===> ' + JSON.stringify(product));
      });

    // Track all store errors
    this.store.error((err) => {
      console.error('Store Error ' + JSON.stringify(err));
    });
  }

  purchase() {
    if(this.appAlreadyPurchased) {
      this.presentAlert('Failed', `Previous purchase found. Try to restore purchase.`, 'OK');
      return;
    }

    this.buying = true;
    const product = this.products[0];

    this.store.order(product).then(p => {
      // Purchase in progress!
      this.buying = false;
    }, e => {
      this.buying = false;

      this.presentAlert('Failed', `Failed to purchase: ${e}`, 'OK');
    });
  }

  // To comply with AppStore rules
  restore() {
    const product = this.products[0];

    if (product.owned) {
      this.activateFullVersion();
      this.presentAlert('Success', 'Previous purchase restored.', 'OK', true);
    } else {
      this.presentAlert('Failure', 'No previous purchase found.', 'OK')
    }
  }

  // getProductsList() {
  //   this.iap.getProducts(['learnarab_full_version'])
  //     .then(function (products) {

  //       console.log("products found");
  //       console.log(products);
  //       this.products = products;
  //     })
  //     .catch(function (err) {

  //       console.log('Product Listing Error: ' + JSON.stringify(err));
  //     });
  // }

  // buyFullVersion() {
  //   this.iap
  //     .buy('learnarab_full_version')
  //     .then((data) => {
  //       alert("Success " + JSON.stringify(data));
  //       this.activateFullVersion();
  //     })
  //     .catch((err) => {
  //       console.log(JSON.stringify(err));
  //       alert("Err " + JSON.stringify(err));

  //     });
  // }

  // restorePurchase() {
  //   this.iap
  //     .restorePurchases()
  //     .then((data) => {
  //       alert("Success " + JSON.stringify(data));

  //       this.products.forEach((product, index) => {
  //         data.forEach((purchase, index) => {
  //           if (product.productId === purchase.productId) {
  //             this.activateFullVersion();
  //           }
  //         });
  //       });

  //       if (this.settings.appPurchased) {
  //         this.presentAlert('Success', 'Previous purchase restored.', 'ok')
  //       } else {
  //         this.presentAlert('Failure', 'No previous purchase found.', 'ok')
  //       }
  //     }).catch((err) => {
  //       console.log(JSON.stringify(err));
  //       alert("Err " + JSON.stringify(err));

  //       this.presentAlert('Failure', 'No previous purchase found.', 'ok')
  //     });
  // }

  activateFullVersion() {
    this.settings.appPurchased = true;
    this.settingsDataService.changeSettings(this.settings);
  }

  async presentAlert(header, message, buttontext, redirectToHome = false) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss: false,
      buttons: [{
        text: buttontext,
        handler: () => {
          if(!redirectToHome) return;
          this.router.navigateByUrl('/');
        }
      }]
    });

    await alert.present();
  }

  get settings() {
    return this.settingsDataService.settings;
  }

  get productPrice() {
    if (this.products.length == 0) return null;
    return this.products[0].price;
  }

}
