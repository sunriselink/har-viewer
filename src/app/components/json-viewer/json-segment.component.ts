import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    inject,
    Input,
    input,
    OnInit,
    signal,
} from '@angular/core';
import { Primitive } from '../../types/primitive';
import { Unsafe } from '../../types/unsafe';
import { isObjectOrArray } from '../../utils/is-object-or-array';
import { StringContentService } from '../string-content-modal/string-content.service';
import { JsonViewerComponent } from './json-viewer.component';
import { Segment } from './segments/base/segment';

type ExpandType = 'slim' | 'full';

@Component({
    selector: 'app-json-segment',
    standalone: true,
    templateUrl: './json-segment.component.html',
    styleUrl: './json-segment.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [forwardRef(() => JsonViewerComponent)],
})
export class JsonSegmentComponent implements OnInit {
    public segment = input.required<Segment>();

    @Input({ transform: booleanAttribute })
    public opened!: boolean;

    protected readonly expandable = computed(() => isObjectOrArray(this.segment().value));
    protected readonly expanded = signal<Unsafe<ExpandType>>(null);

    protected readonly isString = computed(() => this.isType('string'));
    protected readonly isNumber = computed(() => this.isType('number'));
    protected readonly isBoolean = computed(() => this.isType('boolean'));

    protected readonly limitedStringValue = computed(() => this.isLimited());

    protected readonly stringContentService = inject(StringContentService);

    public ngOnInit(): void {
        if (this.opened) {
            this.expanded.set('full');
        }
    }

    protected toggle(event: MouseEvent): void {
        this.expanded.update(state => {
            if (state) {
                return null;
            } else {
                return event.altKey ? 'full' : 'slim';
            }
        });
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
