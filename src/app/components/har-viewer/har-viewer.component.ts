import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IHAR } from '../../types/har-log';

@Component({
    selector: 'app-har-viewer',
    templateUrl: './har-viewer.component.html',
    styleUrls: ['./har-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarViewerComponent {
    @Input()
    public harLog: IHAR;
}
