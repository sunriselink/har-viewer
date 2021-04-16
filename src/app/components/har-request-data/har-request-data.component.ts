import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IHAREntryKeyValue } from '../../types/har-log';

@Component({
    selector: 'app-har-request-data',
    templateUrl: './har-request-data.component.html',
    styleUrls: ['./har-request-data.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarRequestDataComponent {
    @Input()
    public header: string;

    @Input()
    public headers: IHAREntryKeyValue[];

    @Input()
    public queryData: IHAREntryKeyValue[];

    @Input()
    public postData: string;

    @Input()
    public responseData: string;

    @Input()
    public bodySize: number;

    public sortByKey(array: IHAREntryKeyValue[]): IHAREntryKeyValue[] {
        return array?.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
}
