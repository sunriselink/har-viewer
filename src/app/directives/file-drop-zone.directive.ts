import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appFileDropZone]',
})
export class FileDropZoneDirective implements OnInit, OnDestroy {
    @Output()
    public fileDrop: EventEmitter<File> = new EventEmitter<File>();

    @Output()
    public fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('dragover', ['$event'])
    public onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver$$.next(true);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver$$.next(false);
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.fileOver$$.next(false);

        if (event.dataTransfer.files.length > 0) {
            this.fileDrop.emit(event.dataTransfer.files[0]);
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
}
