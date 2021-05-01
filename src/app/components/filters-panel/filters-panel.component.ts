import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-filters-panel',
    templateUrl: './filters-panel.component.html',
    styleUrls: ['./filters-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersPanelComponent {}
