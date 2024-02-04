import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-expansion-panel-header',
    standalone: true,
    templateUrl: './expansion-panel-header.component.html',
    styleUrl: './expansion-panel-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelHeaderComponent {}
