import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { JSONValue } from '../../types/json-value';
import { Unsafe } from '../../types/unsafe';
import { truncate } from '../../utils/truncate';
import { JsonViewerComponent } from '../json-viewer/json-viewer.component';
import { StringContentService } from '../string-content-modal/string-content.service';

interface ITextContent {
    full: string;
    limited: string;
}

const STRING_LENGTH_LIMIT = 512;

@Component({
    selector: 'app-har-content',
    standalone: true,
    templateUrl: './har-content.component.html',
    styleUrl: './har-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [JsonViewerComponent],
})
export class HarContentComponent {
    public content = input.required<string>();

    protected readonly text = this.createTextSignal();
    protected readonly json = this.createJsonSignal();

    private readonly stringContentService = inject(StringContentService);

    protected showMore(): void {
        this.stringContentService.openModal(this.text().full);
    }

    private createTextSignal(): Signal<ITextContent> {
        return computed(() => this.mapText(this.content()));
    }

    private createJsonSignal(): Signal<JSONValue> {
        return computed(() => this.tryParseJSON(this.text().full));
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
