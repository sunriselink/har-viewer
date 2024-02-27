import {
    ApplicationRef,
    ComponentRef,
    createComponent,
    createEnvironmentInjector,
    DestroyRef,
    EnvironmentInjector,
    inject,
    Injectable,
    Type,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Unsafe } from '../../types/unsafe';
import { ModalContainerComponent } from './modal-container.component';
import { ModalRef } from './modal-ref';

interface IModalVars {
    container: ComponentRef<unknown>;
    content: ComponentRef<unknown>;
}

const NO_SCROLL_CLASS = 'no-scroll';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private readonly injector = inject(EnvironmentInjector);
    private readonly appRef = inject(ApplicationRef);

    private modalVars: Unsafe<IModalVars> = null;

    public open<T, O = unknown>(component: Type<T>, data?: O): void {
        this.destroyAll();

        const modalRef = new ModalRef(data);
        const environmentInjector = this.getEnvironmentInjector(modalRef);

        const componentRef = createComponent(component, { environmentInjector });
        const modalComponentRef = createComponent(ModalContainerComponent, {
            environmentInjector,
            projectableNodes: [[componentRef.location.nativeElement]],
        });

        this.modalVars = {
            container: modalComponentRef,
            content: componentRef,
        };

        this.attachToView(this.modalVars);
        this.subscribeOnClose(this.modalVars, modalRef);
    }

    private destroyAll(): void {
        if (!this.modalVars) {
            return;
        }

        this.modalVars.content.destroy();
        this.modalVars.container.destroy();
        this.modalVars = null;
        document.body.classList.remove(NO_SCROLL_CLASS);
    }

    private getEnvironmentInjector(modalRef: ModalRef): EnvironmentInjector {
        return createEnvironmentInjector([{ provide: ModalRef, useValue: modalRef }], this.injector);
    }

    private attachToView(modalVars: IModalVars): void {
        this.appRef.attachView(modalVars.content.hostView);
        this.appRef.attachView(modalVars.container.hostView);

        document.body.prepend(modalVars.container.location.nativeElement);
        document.body.classList.add(NO_SCROLL_CLASS);
    }

    private subscribeOnClose(modalVars: IModalVars, modalRef: ModalRef): void {
        modalRef
            .onClose()
            .pipe(takeUntilDestroyed(modalVars.container.injector.get(DestroyRef)))
            .subscribe(() => this.destroyAll());
    }
}
