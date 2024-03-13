import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { HarViewerComponent } from './components/har-viewer/har-viewer.component';
import { VersionComponent } from './components/version/version.component';
import { FileDropZoneDirective } from './directives/file-drop-zone.directive';
import { HarReaderService } from './services/har-reader.service';
import { IHAR } from './types/har-log';
import { Unsafe } from './types/unsafe';
import { catchAndLogError } from './utils/catch-and-log-error';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FileDropZoneDirective, FileUploaderComponent, VersionComponent, HarViewerComponent],
})
export class AppComponent {
    protected readonly fileOver = signal(false);

    protected readonly harFile$ = new BehaviorSubject<Unsafe<File>>(null);
    protected readonly harLog = this.createHARSignal();

    protected readonly harReader = inject(HarReaderService);

    protected loadHAR(file: File): void {
        this.harFile$.next(file);
    }

    private createHARSignal(): Signal<Unsafe<IHAR>> {
        const harLog$ = this.harFile$.pipe(switchMap(file => this.readFile(file)));
        return toSignal(harLog$);
    }

    private readFile(file: Unsafe<File>): Observable<Unsafe<IHAR>> {
        if (!file) {
            return of(null);
        }

        return this.harReader.readHAR(file).pipe(catchAndLogError());
    }
}
