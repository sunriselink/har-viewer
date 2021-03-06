import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BlobService } from './services/blob.service';
import { IHAR } from './types/har-log';
import { catchAndLogError } from './utils/catch-and-log-error';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    public fileOver = false;

    public harLog$: Observable<IHAR>;

    private harFile$$: BehaviorSubject<File> = new BehaviorSubject<File>(null);

    constructor(private blobService: BlobService) {}

    public ngOnInit(): void {
        this.harLog$ = this.harFile$$.pipe(switchMap((file: File) => this.readFile(file)));
    }

    public loadHAR(file: File): void {
        this.harFile$$.next(file);
    }

    private readFile(file: File) {
        if (!file) {
            return of(null);
        }

        return this.blobService.readContent(file).pipe(
            map((content: string) => JSON.parse(content)),
            catchAndLogError(),
        );
    }
}
