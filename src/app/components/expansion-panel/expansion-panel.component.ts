import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelComponent implements OnInit {
    @Input()
    @HostBinding('class.show-toggle')
    public showToggle = false;

    @Input()
    public initialOpened = false;

    public opened: boolean;

    public ngOnInit(): void {
        this.opened = this.initialOpened;
    }

    public toggle(): void {
        this.opened = !this.opened;
    }
}
