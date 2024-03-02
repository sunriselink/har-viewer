import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appExpansionPanelContent]',
    standalone: true,
})
export class ExpansionPanelContentDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
