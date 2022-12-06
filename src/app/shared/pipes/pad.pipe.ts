import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pad'
})
export class PadPipe implements PipeTransform {
  transform(num: number, size: number = 2): string {
    var s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

}
