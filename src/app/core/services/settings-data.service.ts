import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { FileService } from './file.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsDataService {
  settings: any = {};
  settingsLoaded: boolean = false;

  private subject: Subject<any>;

  constructor(
    private localStorageService: LocalStorageService,
    private fileService: FileService
  ) {
    this.subject = new Subject();
  }

  trigger() {
    this.subject.next({ ...this.settings, settingsLoaded: this.settingsLoaded })
  }

  subscribe(next, err?, complete?) {
    return this.subject.subscribe(next, err, complete)
  }

  initSettings() {
    if (!this.settingsLoaded) {
      this.loadSettings();
    }
  }

  loadSettings() {
    // DEBUG!!!!
    let oldSettings = this.localStorageService.getSettings();
    if (!oldSettings) {
      // no settings found!
      // file based backup available?
      this.fileService.readSettingsFile().then(content => {
        console.log('settings backup contents are:');
        console.log(content.data);

        try {
          this.settings = JSON.parse(content.data);
        } catch (e) {
          // forget about it :)
          console.log('error parsing json from settings backup');
          this.settings = {};
        }
        this.loadSettingsDone();
      }, error => {
        console.log('READING' + JSON.stringify(error));

        // error
        // new installation
        console.log('settings backup from json file failed!!!');
        console.log('No settings backup found');
        this.settings = {};
        this.loadSettingsDone();
      });
    } else {
      this.settings = oldSettings;
      this.loadSettingsDone();
    }

  }

  changeSettings(settings: any) {
    this.settings = settings;
    this.saveSettings();
  }

  saveSettings() {
    console.log("Settings Changed");
    this.localStorageService.storeSettings(this.settings);

    this.fileService.writeSettingsFile(JSON.stringify(this.settings)).then(status => {
      console.log('Settings written to file from saveSettings');
      return true;
    }, error => {
      console.log(JSON.stringify(error));
      return false;
    });
  }

  loadSettingsDone() {
    console.log('Settings loaded');
    this.settingsLoaded = true;

    //Do some checks for backwards compatibility
    if (this.settings.appPurchased === undefined) {
      //console.log('appPurchased undefined');
      this.settings.appPurchased = false;
    }

    if (this.settings.firstUpgrade === undefined) {
      //console.log('firstUpgrade undefined');
      this.settings.firstUpgrade = 0;
    }

    if (this.settings.allDone === undefined) {
      //console.log('allDone undefined');
      this.settings.allDone = 0;
    }

    if (this.settings.fullMode != true) {
      this.settings.fullMode = false;
    }

    // Save Settings
    this.saveSettings();

    this.trigger();
  }


}
