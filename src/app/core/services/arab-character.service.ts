import { Injectable } from '@angular/core';
import { CharacterData } from 'src/app/data/character.data';

@Injectable({
  providedIn: 'root'
})
export class ArabCharacterService {
  getPhonetic(arabicLetter) {
    return CharacterData[arabicLetter];
  };
}
