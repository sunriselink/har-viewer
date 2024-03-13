import { Pipe, PipeTransform } from '@angular/core';
import { Unsafe } from '../types/unsafe';

/**
 * https://en.wikipedia.org/wiki/Kilobyte
 *
 * Хром показывает в настоящий килобайтах, и я буду
 */
const KILO_SIZE = 1000;
const UNITS = ['B', 'kB', 'MB', 'GB'];

@Pipe({
    name: 'size',
    standalone: true,
})
export class SizePipe implements PipeTransform {
    public transform(value: Unsafe<number>): string {
        value = value ?? 0;
        let unitResult = UNITS[0];

        for (let i = 1; i < UNITS.length; i++) {
            if (value < KILO_SIZE) {
                break;
            }

            value /= KILO_SIZE;
            unitResult = UNITS[i];
        }

        return `${value.toFixed(2).replace(/\.?0+$/, '')} ${unitResult}`;
    }
}
