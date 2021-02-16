import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-expansion-panel-content',
    templateUrl: './expansion-panel-content.component.html',
    styleUrls: ['./expansion-panel-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelContentComponent {}
