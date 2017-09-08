import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter'
})
export class ConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let newValue = value;
    if (value >= 1000) {
        let suffixes = ["", "K", "M", "B","T"];
        let suffixNum = Math.floor( (""+value).length/3 );
        let shortValue = '';
        for (let precision = 2; precision >= 1; precision--) {
            shortValue = String(parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision)));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;

  }

}
