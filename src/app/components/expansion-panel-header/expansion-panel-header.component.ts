import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-expansion-panel-header',
    templateUrl: './expansion-panel-header.component.html',
    styleUrls: ['./expansion-panel-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelHeaderComponent {}
