import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent {
    @Input()
    public buttonText: string = 'SELECT FILE';

    @Output()
    public fileSelect: EventEmitter<File> = new EventEmitter<File>();

    public onFileSelect(event: Event) {
        this.fileSelect.emit((event.target as HTMLInputElement).files[0]);
    }
}
