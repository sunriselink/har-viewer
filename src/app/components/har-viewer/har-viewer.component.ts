import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { IHAR, IHAREntry } from '../../types/har-log';

interface IFilter {
    successful: boolean;
    errors: boolean;
    url: string;
}

@Component({
    selector: 'app-har-viewer',
    templateUrl: './har-viewer.component.html',
    styleUrls: ['./har-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarViewerComponent implements OnInit {
    @Input()
    public set harLog(value: IHAR) {
        this.harLog$$.next(value);
    }

    public entries$: Observable<IHAREntry[]>;
    public form: FormGroup;

    private harLog$$: BehaviorSubject<IHAR> = new BehaviorSubject<IHAR>(null);

    constructor(private fb: FormBuilder) {}

    public ngOnInit(): void {
        this.form = this.createForm();
        this.entries$ = this.createEntries();
    }

    private createEntries(): Observable<IHAREntry[]> {
        const filter$: Observable<IFilter> = this.form.valueChanges.pipe(debounceTime(300), startWith(this.form.value));

        return combineLatest([this.harLog$$, filter$]).pipe(
            map(([harLog, filters]: [IHAR, IFilter]) => {
                const entries: IHAREntry[] = harLog.log?.entries || [];
                return entries.filter((entry: IHAREntry) => this.filterEntry(filters, entry));
            }),
        );
    }

    private filterEntry(filters: IFilter, entry: IHAREntry): boolean {
        if (!filters.successful && entry.response?.status < 400) {
            return false;
        }

        if (!filters.errors && entry.response?.status >= 400) {
            return false;
        }

        const url = entry.request?.url?.toLowerCase();
        const searchString = filters.url?.trim().toLowerCase();

        if (searchString && url && !url.includes(searchString)) {
            return false;
        }

        return true;
    }

    private createForm(): FormGroup {
        const model: IFilter = {
            successful: true,
            errors: true,
            url: null,
        };

        return this.fb.group(model);
    }
}
