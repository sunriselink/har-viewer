import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-har-content',
    templateUrl: './har-content.component.html',
    styleUrls: ['./har-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarContentComponent implements OnInit {
    @Input()
    public set content(value: string) {
        this.content$$.next(value);
    }

    public json$: Observable<any>;
    public text$: Observable<string>;

    private content$$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public ngOnInit(): void {
        this.text$ = this.content$$.pipe(
            filter((text: string) => !!text),
            distinctUntilChanged(),
        );

        this.json$ = this.text$.pipe(map((content: string) => this.tryParseJson(content)));
    }

    private tryParseJson(text: string): any {
        if (!text) {
            return null;
        }

        text = text.trim();

        if (text.startsWith('{') || text.startsWith('[')) {
            try {
                return JSON.parse(text);
            } catch {
                return null;
            }
        }

        return null;
    }
}
