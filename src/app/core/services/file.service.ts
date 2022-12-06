import { Injectable } from '@angular/core';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly settingsFileName: string = "settingsJSON.txt";
  private readonly progressFileName: string = "progressJSON.txt";

  private blob: Blob;
  constructor() { }

  /**  Settings Data Methods **/
  // checkSettingFile() {
  //   return this.checkFile(this.settingsFileName)
  // }

  readSettingsFile() {
    return this.readFile(this.settingsFileName);
  }

  writeSettingsFile(stringToWrite) {
    return this.writeFile(this.settingsFileName, stringToWrite);
  }

  /** Progress Data Methods **/
  // checkProgressFile() {
  //   return this.checkFile(this.progressFileName)
  // }

  readProgressFile() {
    return this.readFile(this.progressFileName);
  }

  writeProgressFile(stringToWrite) {
    return this.writeFile(this.progressFileName, stringToWrite);
  }

  /** Common Methods **/
  // checkFile(fileName: string) {
  //   return new Promise<Boolean>((resolve, reject) => {
  //     let checkFile = this.file.checkFile(this.file.dataDirectory, fileName);
  //     if (!checkFile) reject("Device not supported");

  //     checkFile.then(success => {
  //       resolve(success);
  //     }, error => {
  //       reject(error);
  //     })
  //   });
  // }

  // createFile(fileName: string) {
  //   return this.file.createFile(this.file.dataDirectory, fileName, true);
  // }

  async readFile(fileName: string) {
    let contents = await Filesystem.readFile({
      path: fileName,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    return contents;
    
    // return new Promise<string>((resolve, reject) => {
      
      
    //   let readFile = this.file.readAsText(this.file.dataDirectory, fileName);
    //   if (!readFile) reject("Device not supported");
    //   alert('OK INside')

    //   readFile.then(success => {
    //     resolve(success);
    //   }, error => {
    //     alert(JSON.stringify(error))

    //     reject(error);
    //   });
    // });
  }

  async writeFile(fileName: string, stringToWrite: string) {
    return await Filesystem.writeFile({
      path: fileName,
      data: stringToWrite,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });

    // this.blob = new Blob([stringToWrite], { type: 'text/plain' });
    // return new Promise<Boolean>((resolve, reject) => {
    //   let writeFile = this.file.writeFile(this.file.dataDirectory, fileName, this.blob, { replace: true, append: false });
    //   if (!writeFile) reject("Device not supported");

    //   writeFile.then(success => {
    //     resolve(success);
    //   }, error => {
    //     reject(error);
    //   })
    // });
  }
}
