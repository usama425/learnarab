import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

import { GeneralInfo, GameInfo, LetterInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseApiUrl: string;

  constructor(private http: HttpClient) { 
    this.baseApiUrl = environment.baseApiUrl;
  }

  getData(fileName) {
    console.log("getdata local " + fileName);
    return this.http.get<any>(`${this.baseApiUrl}/${fileName}.json`)
  }

  getGeneralInfo(): Observable<GeneralInfo> {
    return this.http.get<GeneralInfo>(`${this.baseApiUrl}/generalinfo.json`);
  }

  getGameInfo(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(`${this.baseApiUrl}/gameinfo.json`);
  }

  getLetterInfo(): Observable<LetterInfo[]> {
    return this.http.get<LetterInfo[]>(`${this.baseApiUrl}/letterinfo.json`);
  }
}
