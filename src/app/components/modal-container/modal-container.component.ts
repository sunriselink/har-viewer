import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject } from '@angular/core';
import { ModalRef } from './modal-ref';

@Component({
    selector: 'app-modal-container',
    standalone: true,
    templateUrl: './modal-container.component.html',
    styleUrl: './modal-container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent {
    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly modalRef = inject(ModalRef);

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

    protected close(): void {
        this.modalRef.close();
    }
}
