import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { IHAREntryResponseContent } from '../../types/har-log';

@Component({
    selector: 'app-har-content',
    templateUrl: './har-content.component.html',
    styleUrls: ['./har-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarContentComponent implements OnInit {
    @Input()
    public set content(value: IHAREntryResponseContent) {
        this.content$$.next(value);
    }

    public json$: Observable<any>;
    public text$: Observable<string>;

    private content$$: BehaviorSubject<IHAREntryResponseContent> = new BehaviorSubject<IHAREntryResponseContent>(null);

    public ngOnInit(): void {
        this.json$ = this.content$$.pipe(
            filter(Boolean),
            distinctUntilChanged(),
            map((content: IHAREntryResponseContent) => {
                if (content.text?.trim().startsWith('{')) {
                    try {
                        return JSON.parse(content.text);
                    } catch {
                        return null;
                    }
                }

                return null;
            }),
        );

        this.text$ = this.content$$.pipe(
            filter(Boolean),
            distinctUntilChanged(),
            map((content: IHAREntryResponseContent) => content.text),
        );
    }
}
