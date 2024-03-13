import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    input,
    Signal,
} from '@angular/core';
import { JSONValue } from '../../types/json-value';
import { JsonSegmentComponent } from './json-segment.component';
import { JsonViewerService } from './json-viewer.service';
import { Segment } from './segments/base/segment';

@Component({
    selector: 'app-json-viewer',
    standalone: true,
    templateUrl: './json-viewer.component.html',
    styleUrl: './json-viewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [JsonSegmentComponent],
})
export class JsonViewerComponent {
    public json = input.required<JSONValue>();

    @Input({ transform: booleanAttribute })
    public opened!: boolean;

    protected readonly segments = this.getSegments();

    private readonly jsonViewerService = inject(JsonViewerService);

    private getSegments(): Signal<Segment[]> {
        return computed(() => this.jsonViewerService.createSegments(this.json()));
    }
}
