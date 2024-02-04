import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Unsafe } from '../types/unsafe';

@Directive({
    selector: '[appFileDropZone]',
    standalone: true,
})
export class FileDropZoneDirective implements OnInit, OnDestroy {
    @Output()
    public fileDrop: EventEmitter<File> = new EventEmitter<File>();

    @Output()
    public fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('dragover', ['$event'])
    public onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver$$.next(true);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver$$.next(false);
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this.fileOver$$.next(false);

        const file = this.getFile(event);

        if (file) {
            this.fileDrop.emit(file);
        }
    }

    private fileOver$$: Subject<boolean> = new Subject<boolean>();
    private destroy$$: Subject<void> = new Subject<void>();

    public ngOnInit(): void {
        this.fileOver$$
            .pipe(distinctUntilChanged(), debounceTime(50), takeUntil(this.destroy$$))
            .subscribe((value: boolean) => this.fileOver.emit(value));
    }

    public ngOnDestroy(): void {
        this.destroy$$.next();
        this.destroy$$.complete();
    }

    private getFile(event: DragEvent): Unsafe<File> {
        const files = event.dataTransfer?.files;
        return files?.length ? files[0] : null;
    }
}
