import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalService } from '../modal/modal.service';
import { JsonViewerService } from './json-viewer.service';
import { Segment } from './segments/segment';

@Component({
    selector: 'app-json-viewer',
    templateUrl: './json-viewer.component.html',
    styleUrls: ['./json-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonViewerComponent implements OnInit {
    @Input()
    public set json(value: any) {
        this.json$$.next(value);
    }

    public segments$: Observable<Segment[]>;

    private json$$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private jsonViewerService: JsonViewerService, private modalService: ModalService) {}

    public ngOnInit(): void {
        this.segments$ = this.json$$.pipe(map((json: any) => this.jsonViewerService.createSegments(json)));
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
