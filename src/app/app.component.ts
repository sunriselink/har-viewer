import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppInfoService } from './services/app-info.service';
import { FileService } from './services/file.service';
import { IHAR } from './types/har-log';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    public harLog$: Observable<IHAR>;

    private harFile$$: BehaviorSubject<File> = new BehaviorSubject<File>(null);

    constructor(private fileService: FileService, private infoService: AppInfoService) {}

    public ngOnInit(): void {
        this.showInfo();

        this.harLog$ = this.harFile$$.pipe(
            switchMap((file: File) => {
                if (!file) {
                    return of(null);
                }

                return this.fileService.readFileContent(file).pipe(
                    map(content => JSON.parse(content)),
                    catchError((err: any) => {
                        console.error(err);
                        alert('Ошибка чтения HAR');
                        return of(null);
                    }),
                );
            }),
        );
    }

    public loadHAR(event: Event) {
        const input = event.target as HTMLInputElement;
        this.harFile$$.next(input.files[0]);
    }

    private showInfo(): void {
        console.log(`HarViewer ${this.infoService.version} (${this.infoService.branch} ${this.infoService.commit})`);
    }
}
