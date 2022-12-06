import { Component, OnInit } from '@angular/core';

import { SettingsDataService, UtilityService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  debugMode: boolean = false;

  constructor(
    private utilityService: UtilityService,
    private settingsDataService: SettingsDataService
  ) { }

  ngOnInit() {
    this.debugMode = this.utilityService.isDebugModeEnabled();
  }

  get settings() {
    return this.settingsDataService.settings;
  }
}
