import { inject, Injectable } from '@angular/core';
import { ModalService } from '../modal-container/modal.service';
import { StringContentModalComponent } from './string-content-modal.component';

@Injectable({
    providedIn: 'root',
})
export class StringContentService {
    private readonly modalService = inject(ModalService);

    public open(content: string): void {
        this.modalService.open(StringContentModalComponent, content);
    }
}
