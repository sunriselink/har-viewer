import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { JSONValue } from '../../types/json-value';
import { ModalService } from '../modal/modal.service';
import { JsonViewerService } from './json-viewer.service';
import { Segment } from './segments/segment';

@Component({
    selector: 'app-json-viewer',
    standalone: true,
    templateUrl: './json-viewer.component.html',
    styleUrl: './json-viewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, NgForOf, NgIf],
})
export class JsonViewerComponent {
    @Input({ required: true })
    public set json(value: JSONValue) {
        this.json$$.next(value);
    }

    protected readonly segments$: Observable<Segment[]>;

    private readonly jsonViewerService = inject(JsonViewerService);
    private readonly modalService = inject(ModalService);

    private readonly json$$ = new ReplaySubject<JSONValue>(1);

    constructor() {
        this.segments$ = this.json$$.pipe(map((json: JSONValue) => this.jsonViewerService.createSegments(json)));
    }

    public toggle(segment: Segment): void {
        if (segment.expandable) {
            segment.toggle();
        }
    }

    public showMore(segment: Segment): void {
        this.modalService.open(segment.value as string);
    }
}
