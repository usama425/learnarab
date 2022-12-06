import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly uniqueKey: string = "uniqueKey";
  private readonly applicationData: string = "applicationData";
  private readonly progressCopiedKey: string = "progressCopied";
  private readonly settingsKey: string = "settingsJSON";
  private readonly progressKey: string = "progressJSON";

  constructor() { }

  getApplicationData() {
    let data = localStorage.getItem(this.applicationData);
    if (!data) return {};

    try {
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  storeApplicationData(data) {
    localStorage.setItem(this.applicationData, JSON.stringify(data));
  }

  getUniqueKey() {
    return localStorage.getItem(this.uniqueKey);
  }

  getProgressCopied() {
    return localStorage.getItem(this.progressCopiedKey);
  }

  storeProgressCopied(value: string) {
    return localStorage.setItem(this.progressCopiedKey, value);
  }

  getSettings() {
    let settings = localStorage.getItem(this.settingsKey);
    if (!settings) return null;

    try {
      return JSON.parse(settings);
    } catch (error) {
      return null;
    }

  }

  getProgressData() {
    let progressData = localStorage.getItem(this.progressKey);
    if (!progressData) return null;

    try {
      return JSON.parse(progressData);
    } catch (error) {
      return null;
    }

  }

  storeSettings(data: object) {
    localStorage.setItem(this.settingsKey, JSON.stringify(data));
  }

  storeProgressData(data: any) {
    localStorage.setItem(this.progressKey, JSON.stringify(data));
  }
}
