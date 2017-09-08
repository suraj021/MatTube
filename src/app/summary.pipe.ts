import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform( value: any, limit?: number ){
        if( !value ){
            return null;
        }

        let text= ( value as string );
        let actualLimit= (limit)?limit:100;

        if( text.length <= actualLimit )
            return text;

        return text.substr( 0, actualLimit ) + '...';

    }

}
