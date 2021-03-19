import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IHAREntry } from '../../types/har-log';
import { TagColor } from '../tag/tag.component';

@Component({
    selector: 'app-har-entry',
    templateUrl: './har-entry.component.html',
    styleUrls: ['./har-entry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarEntryComponent {
    @Input()
    public entry: IHAREntry;

    public get statusColor(): TagColor {
        return this.entry.response.status >= 400 ? 'red' : 'blue';
    }
}
