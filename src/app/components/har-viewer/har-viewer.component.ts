import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, map, Observable, ReplaySubject, startWith } from 'rxjs';
import { IHAR, IHAREntry } from '../../types/har-log';
import { HarEntryComponent } from '../har-entry/har-entry.component';
import { HarViewerFilters } from './har-viewer-filters';

@Component({
    selector: 'app-har-viewer',
    standalone: true,
    templateUrl: './har-viewer.component.html',
    styleUrl: './har-viewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, AsyncPipe, NgForOf, HarEntryComponent],
})
export class HarViewerComponent {
    @Input({ required: true })
    public set harLog(value: IHAR) {
        this.harLog$$.next(value);
    }

    protected readonly entries$: Observable<IHAREntry[]>;
    protected readonly form = new HarViewerFilters();

    private readonly harLog$$ = new ReplaySubject<IHAR>(1);

    constructor() {
        this.entries$ = this.createEntries();
    }

    private createEntries(): Observable<IHAREntry[]> {
        const filter$ = this.form.valueChanges.pipe(debounceTime(300), startWith(this.form.value));

        return combineLatest([this.harLog$$, filter$]).pipe(
            map(([harLog]) => {
                const entries: IHAREntry[] = harLog.log?.entries || [];
                return entries.filter((entry: IHAREntry) => this.filterEntry(entry));
            }),
        );
    }

    private filterEntry(entry: IHAREntry): boolean {
        const filters = this.form.value;

        if (!filters.successful && entry.response?.status < 400) {
            return false;
        }

        if (!filters.errors && entry.response?.status >= 400) {
            return false;
        }

        const url = entry.request?.url?.toLowerCase();
        const searchString = filters.url?.trim().toLowerCase();

        return searchString && url ? url.includes(searchString) : true;
    }
}
