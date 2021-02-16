import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelComponent {
    public opened: boolean = false;

    public toggle(): void {
        this.opened = !this.opened;
    }
}
