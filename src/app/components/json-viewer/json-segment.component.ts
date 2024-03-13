import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, signal } from '@angular/core';
import { Primitive } from '../../types/primitive';
import { isObjectOrArray } from '../../utils/is-object-or-array';
import { StringContentService } from '../string-content-modal/string-content.service';
import { JsonViewerComponent } from './json-viewer.component';
import { Segment } from './segments/base/segment';

@Component({
    selector: 'app-json-segment',
    standalone: true,
    templateUrl: './json-segment.component.html',
    styleUrl: './json-segment.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [forwardRef(() => JsonViewerComponent)],
})
export class JsonSegmentComponent {
    public segment = input.required<Segment>();

    protected readonly expandable = computed(() => isObjectOrArray(this.segment().value));
    protected readonly expanded = signal(false);

    protected readonly isString = computed(() => this.isType('string'));
    protected readonly isNumber = computed(() => this.isType('number'));
    protected readonly isBoolean = computed(() => this.isType('boolean'));

    protected readonly limitedStringValue = computed(() => this.isLimited());

    protected readonly stringContentService = inject(StringContentService);

    protected toggle(): void {
        this.expanded.update(x => !x);
    }

    protected showMore(): void {
        const value = this.segment().value;

        if (typeof value === 'string') {
            this.stringContentService.openModal(value);
        }
    }

    private isType(type: Primitive): boolean {
        return typeof this.segment().value === type;
    }

    private isLimited(): boolean {
        const value = this.segment().value;
        return typeof value === 'string' && value.length > this.segment().stringValue.length;
    }
}
