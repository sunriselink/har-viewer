import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SizePipe } from '../../pipes/size.pipe';
import { SortByKeyPipe } from '../../pipes/sort-by-key.pipe';
import { IHAREntryKeyValue } from '../../types/har-log';
import { ExpansionPanelContentDirective } from '../expansion-panel/expansion-panel-content.directive';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';
import { HarContentComponent } from '../har-content/har-content.component';

@Component({
    selector: 'app-har-request-data',
    standalone: true,
    templateUrl: './har-request-data.component.html',
    styleUrl: './har-request-data.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SizePipe, ExpansionPanelComponent, SortByKeyPipe, HarContentComponent, ExpansionPanelContentDirective],
})
export class HarRequestDataComponent {
    @Input({ required: true })
    public label!: string;

    @Input()
    public headers?: IHAREntryKeyValue[];

    @Input()
    public queryData?: IHAREntryKeyValue[];

    @Input()
    public postData?: string;

    @Input()
    public responseData?: string;

    @Input()
    public bodySize?: number;

    protected get hasBody(): boolean {
        return typeof this.bodySize === 'number';
    }
}
