import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent {
    @Output()
    public fileSelect: EventEmitter<File> = new EventEmitter<File>();

    public onFileSelect(event: Event) {
        this.fileSelect.emit((event.target as HTMLInputElement).files[0]);
    }
}
