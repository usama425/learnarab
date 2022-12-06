import { FileService } from './file.service';
import { DataService } from './data.service';
import { LocalStorageService } from './localstorage.service';
import { UtilityService } from './utility.service';
import { SettingsDataService } from './settings-data.service';
import { ProgressDataService } from './progress-data.service';
import { ArabCharacterService } from './arab-character.service';
import { EventService } from './event.service';
import { BaseGameService } from './base-game.service';
import { TimerService } from './timer.service';
import { AdmobService } from './admob.service';

export const services = [
    FileService,
    LocalStorageService,
    SettingsDataService,
    EventService,
    DataService,
    UtilityService,
    ProgressDataService,
    ArabCharacterService,
    BaseGameService,
    TimerService,
    AdmobService
];

export * from './file.service';
export * from './data.service';
export * from './event.service';
export * from './localstorage.service';
export * from './utility.service';
export * from './settings-data.service';
export * from './progress-data.service';
export * from './arab-character.service';
export * from './base-game.service';
export * from './timer.service';
export * from './admob.service';
