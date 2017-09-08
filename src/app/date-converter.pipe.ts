import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

    dateDiff(dt1, dt2){
        /*
         * setup 'empty' return object
         */
        var ret = {days:0, months:0, years:0};
    
        /*
         * If the dates are equal, return the 'empty' object
         */
        if (dt1 == dt2) return ret;
    
        /*
         * ensure dt2 > dt1
         */
        if (dt1 > dt2)
        {
            var dtmp = dt2;
            dt2 = dt1;
            dt1 = dtmp;
        }
    
        /*
         * First get the number of full years
         */
    
        var year1 = dt1.getFullYear();
        var year2 = dt2.getFullYear();
    
        var month1 = dt1.getMonth();
        var month2 = dt2.getMonth();
    
        var day1 = dt1.getDate();
        var day2 = dt2.getDate();
    
        /*
         * Set initial values bearing in mind the months or days may be negative
         */
    
        ret['years'] = year2 - year1;
        ret['months'] = month2 - month1;
        ret['days'] = day2 - day1;
    
        /*
         * Now we deal with the negatives
         */
    
        /*
         * First if the day difference is negative
         * eg dt2 = 13 oct, dt1 = 25 sept
         */
        if (ret['days'] < 0)
        {
            /*
             * Use temporary dates to get the number of days remaining in the month
             */
            var dtmp1 = new Date(dt1.getFullYear(), dt1.getMonth() + 1, 1, 0, 0, -1);
    
            var numDays = dtmp1.getDate();
    
            ret['months'] -= 1;
            ret['days'] += numDays;
    
        }
    
        /*
         * Now if the month difference is negative
         */
        if (ret['months'] < 0)
        {
            ret['months'] += 12;
            ret['years'] -= 1;
        }
    
        return ret;
    }


  transform(value: string, args?: any): any {

    //console.log( value );

    if( value== null || value== "" )
        return "";

    let index= value.indexOf( 'T' );
    let dt1= new Date( value.substr( 0, index ) );
    let dt2= new Date();

    let diff= this.dateDiff( dt1, dt2 );

    //console.log( diff );

    let ret= "";

    if( diff['years']!= 0 ){
        if( diff['years'] > 1 )
            ret+= diff['years'] + " years ago";
        else
            ret+= diff['years'] + " year ago";
        return ret;
    }else if( diff['months'] != 0 ){
        if( diff['months'] > 1 )
            ret+= diff['months'] + " months ago";
        else
            ret+= diff['months'] + " month ago";
        return ret;
    }else {
        if( diff['days'] > 2 && diff['days'] < 7 )
            ret+= diff['days'] + " days ago";
        else if( diff['days']== 7 && diff['days'] < 14 )
            ret+= "1 week ago";
        else if( diff['days'] > 14 )
            ret+= Math.round( diff['days']/7 ) + " weeks ago";
        else
            ret= "1 day ago";

        return ret;
     }
  }

}
