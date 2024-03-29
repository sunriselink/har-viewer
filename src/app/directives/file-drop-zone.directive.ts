import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Unsafe } from '../types/unsafe';

@Directive({
    selector: '[appFileDropZone]',
    standalone: true,
})
export class FileDropZoneDirective {
    @Output()
    public fileDrop = new EventEmitter<File>();

    @Output()
    public fileOver = new EventEmitter<boolean>();

    @HostListener('dragover', ['$event'])
    protected onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver$.next(true);
    }

    @HostListener('dragleave', ['$event'])
    protected onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver$.next(false);
    }

    @HostListener('drop', ['$event'])
    protected onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this.fileOver$.next(false);

        const file = this.getFile(event);

        if (file) {
            this.fileDrop.emit(file);
        }
    }

    private readonly fileOver$ = new Subject<boolean>();

    constructor() {
        this.createFileOverSubscription();
    }

    private createFileOverSubscription(): void {
        this.fileOver$
            .pipe(distinctUntilChanged(), debounceTime(50), takeUntilDestroyed())
            .subscribe((value: boolean) => this.fileOver.emit(value));
    }

    private getFile(event: DragEvent): Unsafe<File> {
        const files = event.dataTransfer?.files;
        return files?.length ? files[0] : null;
    }
}
