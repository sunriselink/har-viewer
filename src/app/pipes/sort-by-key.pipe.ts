import { Pipe, PipeTransform } from '@angular/core';
import { IHAREntryKeyValue } from '../types/har-log';
import { Unsafe } from '../types/unsafe';

@Pipe({
    name: 'sortByKey',
    standalone: true,
})
export class SortByKeyPipe implements PipeTransform {
    public transform(value: Unsafe<IHAREntryKeyValue[]>): IHAREntryKeyValue[] {
        return value?.slice().sort((a, b) => a.name.localeCompare(b.name)) ?? [];
    }
}
