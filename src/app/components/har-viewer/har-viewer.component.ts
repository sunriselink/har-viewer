import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IHAR, IHAREntry } from '../../types/har-log';
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
    protected readonly entries: Signal<IHAREntry[]>;

    constructor() {
        this.entries = this.createEntries();
    }

    private createEntries(): Signal<IHAREntry[]> {
        const filters$ = this.form.valueChanges.pipe(debounceTime(300));
        const filters = toSignal(filters$, { initialValue: this.form.value });

        return computed(() => {
            const entries: IHAREntry[] = this.harLog().log?.entries || [];
            return entries.filter(x => this.filterEntry(x, filters()));
        });
    }

    private filterEntry(entry: IHAREntry, filters: HarViewerFiltersValue): boolean {
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
