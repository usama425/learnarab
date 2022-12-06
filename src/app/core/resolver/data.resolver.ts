import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { GeneralInfo } from '../models/general-info.model';

@Injectable({
    providedIn: 'root'
})
export class DataResolverService implements Resolve<GeneralInfo> {
    constructor(private localStorageService: LocalStorageService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.localStorageService.getApplicationData();
    }
}