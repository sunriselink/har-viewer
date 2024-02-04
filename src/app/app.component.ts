import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { HarViewerComponent } from './components/har-viewer/har-viewer.component';
import { ModalComponent } from './components/modal/modal.component';
import { VersionComponent } from './components/version/version.component';
import { FileDropZoneDirective } from './directives/file-drop-zone.directive';
import { BlobService } from './services/blob.service';
import { IHAR } from './types/har-log';
import { Unsafe } from './types/unsafe';
import { catchAndLogError } from './utils/catch-and-log-error';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ModalComponent,
        FileDropZoneDirective,
        AsyncPipe,
        NgIf,
        FileUploaderComponent,
        VersionComponent,
        HarViewerComponent,
    ],
})
export class AppComponent {
    protected fileOver = false;
    protected readonly harLog$: Observable<Unsafe<IHAR>>;

    private readonly blobService = inject(BlobService);
    private readonly harFile$$ = new BehaviorSubject<Unsafe<File>>(null);

    constructor() {
        this.harLog$ = this.harFile$$.pipe(switchMap(file => this.readFile(file)));
    }

    protected loadHAR(file: File): void {
        this.harFile$$.next(file);
    }

    private readFile(file: Unsafe<File>) {
        if (!file) {
            return of(null);
        }

        return this.blobService.readContent(file).pipe(
            map((content: string) => JSON.parse(content) as IHAR),
            catchAndLogError(),
        );
    }
}
