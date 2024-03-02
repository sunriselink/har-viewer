import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HTTP_CODES } from '../../contstants/http-codes';
import { IHAREntry } from '../../types/har-log';
import { ExpansionPanelContentDirective } from '../expansion-panel/expansion-panel-content.directive';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';
import { HarEntryLineComponent } from '../har-entry-line/har-entry-line.component';
import { HarRequestDataComponent } from '../har-request-data/har-request-data.component';
import { TagColor, TagComponent } from '../tag/tag.component';

@Component({
    selector: 'app-har-entry',
    standalone: true,
    templateUrl: './har-entry.component.html',
    styleUrl: './har-entry.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TagComponent,
        ExpansionPanelComponent,
        HarRequestDataComponent,
        ExpansionPanelContentDirective,
        HarEntryLineComponent,
    ],
})
export class HarEntryComponent {
    public entry = input.required<IHAREntry>();

    protected readonly statusColor = computed(() => this.getStatusColor());
    protected readonly statusText = computed(() => this.getStatusText());

    private getStatusColor(): TagColor {
        return this.entry().response.status >= 400 ? 'red' : 'blue';
    }

    private getStatusText(): string {
        const status = `${this.entry().response.status}`;
        const text = HTTP_CODES.has(status) ? `(${HTTP_CODES.get(status)})` : '';

        return [status, text].filter(Boolean).join(' ');
    }
}
