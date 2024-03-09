import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HAREntry } from '../../models/har-entry';
import { HttpStatusPipe } from '../../pipes/http-status.pipe';
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
        HttpStatusPipe,
    ],
})
export class HarEntryComponent {
    public entry = input.required<HAREntry>();

    protected readonly statusColor = computed(() => this.getStatusColor());

    private getStatusColor(): TagColor {
        return this.entry().response.status >= 400 ? 'red' : 'blue';
    }
}
