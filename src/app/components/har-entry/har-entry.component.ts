import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IHAREntry } from '../../types/har-log';
import { TagColor } from '../tag/tag.component';

const HTTP_CODES = new Map<string, string>([
    ['0', '(Cancelled)'],
    ['200', '(OK)'],
    ['204', '(No Content)'],
    ['304', '(Not Modified)'],
    ['400', '(Bad Request)'],
    ['401', '(Unauthorized)'],
    ['403', '(Forbidden)'],
    ['404', '(Not Found)'],
    ['405', '(Method Not Allowed)'],
    ['418', "(I'm a teapot)"],
    ['500', '(Internal Server Error)'],
    ['502', '(Bad Gateway)'],
    ['503', '(Service Unavailable)'],
    ['504', '(Gateway Timeout)'],
]);

@Component({
    selector: 'app-har-entry',
    templateUrl: './har-entry.component.html',
    styleUrls: ['./har-entry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarEntryComponent {
    @Input()
    public entry: IHAREntry;

    public get statusColor(): TagColor {
        return this.entry.response.status >= 400 ? 'red' : 'blue';
    }

    public get statusText(): string {
        const status = `${this.entry.response.status}`;
        const text = HTTP_CODES.get(status);

        return [status, text].filter(Boolean).join(' ');
    }
}
