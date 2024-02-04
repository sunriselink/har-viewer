import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { distinctUntilChanged, map, Observable, ReplaySubject } from 'rxjs';
import { JSONValue } from '../../types/json-value';
import { Unsafe } from '../../types/unsafe';
import { truncate } from '../../utils/truncate';
import { JsonViewerComponent } from '../json-viewer/json-viewer.component';
import { ModalService } from '../modal/modal.service';

interface ITextContent {
    full: string;
    limited: string;
}

const STRING_LENGTH_LIMIT = 1024;

@Component({
    selector: 'app-har-content',
    standalone: true,
    templateUrl: './har-content.component.html',
    styleUrl: './har-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, AsyncPipe, JsonViewerComponent],
})
export class HarContentComponent {
    @Input({ required: true })
    public set content(value: Unsafe<string>) {
        this.content$$.next(value);
    }

    protected readonly text$: Observable<ITextContent>;
    protected readonly json$: Observable<Unsafe<JSONValue>>;

    private readonly content$$ = new ReplaySubject<Unsafe<string>>(1);

    constructor(private modalService: ModalService) {
        this.text$ = this.content$$.pipe(
            map(text => text ?? ''),
            distinctUntilChanged(),
            map(text => this.mapText(text)),
        );

        this.json$ = this.text$.pipe(map((content: ITextContent) => this.tryParseJSON(content.full)));
    }

    protected showMore(text: string): void {
        this.modalService.open(text);
    }

    private mapText(text: string): ITextContent {
        return {
            full: text,
            limited: truncate(text, STRING_LENGTH_LIMIT),
        };
    }

    private tryParseJSON(text: string): Unsafe<JSONValue> {
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
        text = text.trim();

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
}
