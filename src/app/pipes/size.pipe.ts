import { Pipe, PipeTransform } from '@angular/core';
import { Unsafe } from '../types/unsafe';

@Pipe({
    name: 'size',
    standalone: true,
})
export class SizePipe implements PipeTransform {
    public transform(value: Unsafe<number>): string {
        value = value ?? 0;
        let unit = 'B';

        if (value >= 1024) {
            value /= 1024;
            unit = 'KB';
        }

        if (value >= 1024) {
            value /= 1024;
            unit = 'MB';
        }

        return `${value.toFixed(2).replace(/\.?0+$/, '')} ${unit}`;
    }
}
