import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalRef } from '../modal-container/modal-ref';

@Component({
    selector: 'app-string-content-modal',
    standalone: true,
    templateUrl: './string-content-modal.component.html',
    styleUrl: './string-content-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringContentModalComponent {
    protected readonly modalRef: ModalRef<string> = inject(ModalRef);
}
