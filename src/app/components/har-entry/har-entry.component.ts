import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IHAREntry } from '../../types/har-log';
import { ExpansionPanelContentComponent } from '../expansion-panel-content/expansion-panel-content.component';
import { ExpansionPanelHeaderComponent } from '../expansion-panel-header/expansion-panel-header.component';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';
import { HarRequestDataComponent } from '../har-request-data/har-request-data.component';
import { TagColor, TagComponent } from '../tag/tag.component';

const HTTP_CODES = new Map<string, string>([
    ['0', '(Cancelled)'],
    ['200', '(OK)'],
    ['204', '(No Content)'],
    ['304', '(Not Modified)'],
    ['400', '(Bad Request)'],
    ['401', '(Unauthorized)'],
    ['403', '(Forbidden)'],
    ['404', '(Not Found)'],
    ['405', '(Method Not Allowed)'],
    ['418', "(I'm a teapot)"],
    ['500', '(Internal Server Error)'],
    ['502', '(Bad Gateway)'],
    ['503', '(Service Unavailable)'],
    ['504', '(Gateway Timeout)'],
]);

@Component({
    selector: 'app-har-entry',
    standalone: true,
    templateUrl: './har-entry.component.html',
    styleUrl: './har-entry.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TagComponent,
        ExpansionPanelComponent,
        ExpansionPanelHeaderComponent,
        ExpansionPanelContentComponent,
        NgIf,
        NgTemplateOutlet,
        HarRequestDataComponent,
    ],
})
export class HarEntryComponent {
    @Input({ required: true })
    public entry!: IHAREntry;

    protected get statusColor(): TagColor {
        return this.entry.response.status >= 400 ? 'red' : 'blue';
    }

    protected get statusText(): string {
        const status = `${this.entry.response.status}`;
        const text = HTTP_CODES.get(status);

        return [status, text].filter(Boolean).join(' ');
    }
}
