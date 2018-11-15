import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNonEnglish'
})
export class FilterNonEnglishPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        // remove non english LETTERS
        let formatted = value.replace(/[^a-zA-Z0-9\s]+/g, '')
        return formatted
    }

}
