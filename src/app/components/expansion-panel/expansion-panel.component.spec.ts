import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Unsafe } from '../../types/unsafe';
import { ExpansionPanelContentDirective } from './expansion-panel-content.directive';
import { ExpansionPanelComponent } from './expansion-panel.component';

describe('ExpansionPanelComponent', () => {
    let fixture!: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should bind "show-arrow" class', () => {
        const panelElement = fixture.debugElement.query(By.css('app-expansion-panel'));

        expect(panelElement.classes['show-arrow']).toBeUndefined();

        fixture.componentInstance.showArrow = true;
        fixture.detectChanges();

        expect(panelElement.classes['show-arrow']).toBeTrue();
    });

    it('should show/hide panel content by click', () => {
        expect(getPanelContent()).toBeNull();

        const headerElement = fixture.debugElement.query(By.css('app-expansion-panel .header'));

        headerElement.nativeElement.click();
        fixture.detectChanges();

        expect(getPanelContent()?.nativeElement.innerText).toBe('Panel content');
    });

    function getPanelContent(): Unsafe<DebugElement> {
        return fixture.debugElement.query(By.css('.test-component-content'));
    }
});

@Component({
    standalone: true,
    template: `
        <app-expansion-panel [showArrow]="showArrow">
            <div class="test-component-header">Panel header</div>
            <div *appExpansionPanelContent class="test-component-content">Panel content</div>
        </app-expansion-panel>
    `,
    imports: [ExpansionPanelComponent, ExpansionPanelContentDirective],
})
class TestComponent {
    public showArrow = false;
}
