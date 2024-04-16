import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent {
    @Input()
    public buttonText = 'SELECT FILE';

    @Input()
    public accept?: string;

    @Output()
    public fileSelect = new EventEmitter<File>();

    protected onFileSelect(event: Event): void {
        const file = (event.target as HTMLInputElement)?.files?.[0];

        if (file) {
            this.fileSelect.emit(file);
        }
    }
}
