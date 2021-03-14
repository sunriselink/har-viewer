import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModalService } from './modal.service';

const NO_SCROLL_CLASS = 'no-scroll';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
    @ViewChild('scrollContainer', { read: ElementRef })
    public scrollContainerRef: ElementRef;

    @HostBinding('class.opened')
    public opened = false;

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        if (event.target === this.elementRef.nativeElement) {
            this.close();
        }
    }

    @HostListener('document:keydown.escape')
    public onEscapePress(): void {
        this.close();
    }

    public readonly text$: Observable<string>;

    constructor(private modalService: ModalService, private renderer: Renderer2, private elementRef: ElementRef) {
        this.text$ = modalService.text$;

        modalService.state$.pipe(distinctUntilChanged()).subscribe((opened: boolean) => {
            this.opened = opened;

            if (opened) {
                this.scrollContainer.scrollTop = 0;
                this.renderer.addClass(document.body, NO_SCROLL_CLASS);
            } else {
                this.renderer.removeClass(document.body, NO_SCROLL_CLASS);
            }
        });
    }

    public get scrollContainer(): HTMLElement {
        return this.scrollContainerRef.nativeElement as HTMLElement;
    }

    public close(): void {
        this.modalService.close();
    }
}
