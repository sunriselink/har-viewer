import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { ModalService } from './modal.service';

const NO_SCROLL_CLASS = 'no-scroll';

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe],
})
export class ModalComponent {
    @ViewChild('scrollContainer', { read: ElementRef })
    protected scrollContainerRef!: ElementRef<HTMLElement>;

    @HostBinding('class.opened')
    protected opened = false;

    @HostListener('click', ['$event'])
    protected onClick(event: MouseEvent): void {
        if (event.target === this.elementRef.nativeElement) {
            this.close();
        }
    }

    @HostListener('document:keydown.escape')
    protected onEscapePress(): void {
        this.close();
    }

    private readonly modalService = inject(ModalService);
    private readonly renderer = inject(Renderer2);
    private readonly elementRef = inject(ElementRef);

    constructor() {
        this.modalService.state$.pipe(distinctUntilChanged()).subscribe((opened: boolean) => {
            this.opened = opened;

            if (opened) {
                this.scrollContainer.scrollTop = 0;
                this.renderer.addClass(document.body, NO_SCROLL_CLASS);
            } else {
                this.renderer.removeClass(document.body, NO_SCROLL_CLASS);
            }
        });
    }

    protected get text$() {
        return this.modalService.text$;
    }

    protected close(): void {
        this.modalService.close();
    }

    private get scrollContainer(): HTMLElement {
        return this.scrollContainerRef.nativeElement;
    }
}
