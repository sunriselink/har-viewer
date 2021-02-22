import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppInfoService } from '../../services/app-info.service';

@Component({
    selector: 'app-version',
    templateUrl: './version.component.html',
    styleUrls: ['./version.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent implements OnInit {
    public newVersionAvailable$: Observable<boolean>;

    private newVersionAvailable$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private infoService: AppInfoService, private swUpdate: SwUpdate) {}

    public get version(): string {
        return this.infoService.production ? `v${this.infoService.version}` : 'v0.0.0';
    }

    public ngOnInit(): void {
        this.newVersionAvailable$ = this.newVersionAvailable$$.asObservable();

        this.showInfo();
        this.activateUpdater();
    }

    private showInfo() {
        if (this.infoService.production) {
            const branch = this.infoService.branch;
            const commit = this.infoService.commit;

            console.log(`HarViewer ${this.version} (${branch} ${commit})`);
        }
    }

    private activateUpdater() {
        this.swUpdate.available.subscribe(() => this.newVersionAvailable$$.next(true));
    }
}
