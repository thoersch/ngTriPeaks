import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './card';

@Pipe({
    name: 'peakrow',
    pure: false
})
export class PeakRowPipe implements PipeTransform {
    transform(items: Card[], row: number): any {
        if (!items || !row) {
            return items;
        }
        
        return items.filter(item => item.row == row);
    }
}