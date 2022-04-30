import { Pipe, PipeTransform } from '@angular/core';
   import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
})

// export class DateFormatPipe extends DatePipe implements PipeTransform {
//   override transform(value: any, args?: any): any {
//     return super.transform(value, 'yyyy-MM-dd');
//   }
// }

export class DateFormatPipe implements PipeTransform {
  transform(value: string) {
    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // console.log(date)
    // // output 2021-7-9
    var datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd')!; //dd/MM/yyyy'
    return value;
  }
}

