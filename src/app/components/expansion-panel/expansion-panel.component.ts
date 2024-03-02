import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    OnInit,
    signal,
} from '@angular/core';
import { ExpansionPanelContentDirective } from './expansion-panel-content.directive';

@Component({
    selector: 'app-expansion-panel',
    standalone: true,
    templateUrl: './expansion-panel.component.html',
    styleUrl: './expansion-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet],
})
export class ExpansionPanelComponent implements OnInit {
    @HostBinding('class.show-arrow')
    @Input({ transform: booleanAttribute })
    public showArrow = false;

    @Input({ transform: booleanAttribute })
    public initialOpened = false;

    @ContentChild(ExpansionPanelContentDirective, { static: true })
    protected content!: ExpansionPanelContentDirective;

    protected readonly opened = signal(false);

    public ngOnInit(): void {
        this.opened.set(this.initialOpened);

        if (!this.content) {
            throw new Error('Directive appExpansionPanelContent is required');
        }
    }

    protected toggle(): void {
        this.opened.update(x => !x);
    }
}
