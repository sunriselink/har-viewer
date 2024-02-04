import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-expansion-panel',
    standalone: true,
    templateUrl: './expansion-panel.component.html',
    styleUrl: './expansion-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf],
})
export class ExpansionPanelComponent implements OnInit {
    @Input()
    @HostBinding('class.show-toggle')
    public showToggle = false;

    @Input()
    public initialOpened = false;

    public opened!: boolean;

    public ngOnInit(): void {
        this.opened = this.initialOpened;
    }

    protected toggle(): void {
        this.opened = !this.opened;
    }
}
