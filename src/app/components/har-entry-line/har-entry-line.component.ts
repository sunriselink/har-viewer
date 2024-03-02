import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-har-entry-line',
    standalone: true,
    templateUrl: './har-entry-line.component.html',
    styleUrl: './har-entry-line.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarEntryLineComponent {
    public label = input.required<string>();
    public value = input.required<string>();
}
