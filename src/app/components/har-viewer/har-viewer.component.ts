import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { HAREntry } from '../../models/har-entry';
import { IHAR } from '../../types/har-log';
import { HarEntryComponent } from '../har-entry/har-entry.component';
import { HarViewerFilters, HarViewerFiltersValue } from './har-viewer-filters';

@Component({
    selector: 'app-har-viewer',
    standalone: true,
    templateUrl: './har-viewer.component.html',
    styleUrl: './har-viewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, HarEntryComponent],
})
export class HarViewerComponent {
    public harLog = input.required<IHAR>();

    protected readonly form = new HarViewerFilters();
    protected readonly entries: Signal<HAREntry[]>;

    constructor() {
        this.entries = this.createEntries();
    }

    private createEntries(): Signal<HAREntry[]> {
        const filters$ = this.form.valueChanges.pipe(
            debounceTime(300),
            map(() => this.form.getRawValue()),
        );

        const filters = toSignal(filters$, { initialValue: this.form.getRawValue() });
        const entries = computed(() => this.harLog().log?.entries?.map(x => new HAREntry(x)) ?? []);

        return computed(() => entries().filter(x => this.filterEntry(x, filters())));
    }

    private filterEntry(entry: HAREntry, filters: HarViewerFiltersValue): boolean {
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
