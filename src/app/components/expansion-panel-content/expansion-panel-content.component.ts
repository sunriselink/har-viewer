import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-expansion-panel-content',
    standalone: true,
    templateUrl: './expansion-panel-content.component.html',
    styleUrl: './expansion-panel-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelContentComponent {}
