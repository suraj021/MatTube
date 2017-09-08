import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if( value== null )
      return "";

    if( value== "" )
      return ;

    value= value.substr( 2 );
    let limit= "";

    // find hour

    let indexH= value.indexOf( 'H' );
    
    let hh, mm, ss;

    if( indexH== -1 ){
      hh= "00";
    }else{
      hh= value.substr( 0, indexH );
      value= value.substr( indexH+1 );
    }

    //console.log(indexH+ " " + value + " " + hh);

    let indexM= value.indexOf( 'M' );

    if( indexM== -1 ){
      mm= "00";
    }else{
      mm= value.substr( 0, indexM );
      if( parseInt(mm) < 10 ){
        mm= '0' + mm;
      }
      value= value.substr( indexM+1 );
    }

    //console.log(indexM+ " " + value + " " + mm);

    let indexS= value.indexOf( 'S' );

    if (indexS == -1) {
        ss = "00";
    } else {
        ss = value.substr(0, indexS);
        if( parseInt( ss ) < 10 )
            ss= '0' + ss;
    }

    //console.log(indexS+ " " + value + " " + ss)

    //console.log(hh + " " + mm + " " + ss);

    if( hh != "00" )
      limit+= hh;

    if( mm== "00" ){
      if( limit=== "" ){
        limit= "0";
      }else{
        if (hh == "00") {
            limit += "00";
        } else {
            limit += ":00";
        }
      }
    }else{
      if( limit=== "" ){
        limit= mm;
      }else{
        limit+= ':' + mm;
      }
    }

    if( ss== "00" ){
      limit+= ":00";
    }else{
      limit+= ":" + ss;
    }

    return limit;
  }

}
