import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type TagColor = 'blue' | 'red';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
    @Input()
    public color: TagColor = 'blue';
}
