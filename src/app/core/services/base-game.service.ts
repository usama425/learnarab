import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class BaseGameService {
  constructor(private eventService: EventService) { }
  /**
 * Gets the right game word array
 * @parameter @Array wordsArray - JSON Array of all words/arabic letters
 * @parameter @string arabicLetter - The arabic letter for this game
 * @return @array The word array for the selected letter
 */

  getGameWordArray(wordsArray, arabicLetter) {
    var returnArray = [];
    // var a = wordsArray.splice();
    // console.log(a);
    for (var i = 0; i < wordsArray.length; i++) {
      if (wordsArray[i].meta.arabic_letter === arabicLetter) {
        // console.log(word);
        //Create an array of all the correct words

        returnArray.push(wordsArray[i]);
        // var b = returnArray.splice();
        // console.log(b);
      }
    };
    //            console.log(returnArray);
    if (returnArray.length === 0 || returnArray === []) {
      throw new Error('returnArray is empty for letter ' + arabicLetter);
    }
    //Shuffles the order
    returnArray = _.shuffle(returnArray);


    return returnArray;
  };


  /**
   * Removes an object from an array
   * @parameter @array array - The array from which the object should be removed
   * @parameter object - The object which should be removed from the array
   */
  removeObjectFromArray(array, object) {
    array.forEach((arrayObject, index) => {
      if (object === arrayObject) {
        array.splice(index, 1);
        return;
      }
    });
  };

  /**
     * Removes multiple objects from an array
     * @parameter @array array - The array from which the objects should be removed
     * @paramter @array objectsToRemove - The array of objects which should be removed
     */
  removeObjectsFromArray(array, objectsToRemove) {
    var indexes = [];
    array.forEach((arrayObject, index) => {
      objectsToRemove.forEach((objectToRemove) => {
        if (arrayObject === objectToRemove) {
          indexes.push(index);
        }
      });
    });
    //Every time the array is spliced all indexes are moved, this makes sure that we slice the right new index
    var splicedObjectsAmount = 0;
    indexes.forEach((index) => {
      array.splice(index - splicedObjectsAmount, 1);
      splicedObjectsAmount++;
    });
  };

  //Game is completed
  gameComplete() {
    console.log('Game completed');
  }

  updateScore(newScore) {
    this.eventService.triggerScore(newScore);
  }
}

