import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type TagColor = 'blue' | 'red';

@Component({
    selector: 'app-tag',
    standalone: true,
    templateUrl: './tag.component.html',
    styleUrl: './tag.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
    @Input()
    public color: TagColor = 'blue';
}
