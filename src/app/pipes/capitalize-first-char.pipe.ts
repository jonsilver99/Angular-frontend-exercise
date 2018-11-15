import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizeFirstChar'
})
export class CapitalizeFirstCharPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        // capitalize first letter of each word, lower case rest
        let formatted = value.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
        return formatted
    }
}