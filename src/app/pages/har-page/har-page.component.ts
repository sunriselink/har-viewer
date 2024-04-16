import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { FileUploaderComponent } from '../../components/file-uploader/file-uploader.component';
import { HarViewerComponent } from '../../components/har-viewer/har-viewer.component';
import { FileDropZoneDirective } from '../../directives/file-drop-zone.directive';
import { HarReaderService } from '../../services/har-reader.service';
import { LaunchQueueService } from '../../services/launch-queue.service';
import { IHAR } from '../../types/har-log';
import { Unsafe } from '../../types/unsafe';
import { catchAndLogError } from '../../utils/catch-and-log-error';

@Component({
    selector: 'app-har-page',
    standalone: true,
    templateUrl: './har-page.component.html',
    styleUrl: './har-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FileDropZoneDirective, FileUploaderComponent, HarViewerComponent],
})
export class HarPageComponent implements OnInit {
    protected readonly fileOver = signal(false);

    protected readonly harFile$ = new BehaviorSubject<Unsafe<File>>(null);
    protected readonly harLog = this.createHARSignal();

    private readonly harReader = inject(HarReaderService);
    private readonly launchQueueService = inject(LaunchQueueService);

    public ngOnInit(): void {
        this.launchQueueService.handleFile().subscribe(file => this.loadHAR(file));
    }

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
