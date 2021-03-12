import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { truncate } from '../../utils/truncate';
import { ModalService } from '../modal/modal.service';

interface ITextContent {
    full: string;
    limited: string;
}

const STRING_LENGTH_LIMIT = 1024;

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
    public text$: Observable<ITextContent>;

    private content$$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private modalService: ModalService) {}

    public ngOnInit(): void {
        this.text$ = this.content$$.pipe(
            map((text: string) => text ?? ''),
            distinctUntilChanged(),
            map((text: string) => this.mapText(text)),
        );

        this.json$ = this.text$.pipe(map((content: ITextContent) => this.tryParseJSON(content.full)));
    }

    private mapText(text: string): ITextContent {
        return {
            full: text,
            limited: truncate(text, STRING_LENGTH_LIMIT),
        };
    }

    private tryParseJSON(text: string): any {
        if (!this.isJSON(text)) {
            return null;
        }

        try {
            return JSON.parse(text);
        } catch {
            return null;
        }
    }

    private isJSON(text: string): boolean {
        text = text?.trim();

        if (!text) {
            return false;
        }

        return (
            text !== '{}' &&
            text !== '[]' &&
            (text.startsWith('{') || text.startsWith('[')) &&
            (text.endsWith('}') || text.endsWith(']'))
        );
    }

    public showMore(text: string) {
        this.modalService.open(text);
    }
}
