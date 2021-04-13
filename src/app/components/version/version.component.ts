import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';
import { AppInfoService } from '../../services/app-info.service';

@Component({
    selector: 'app-version',
    templateUrl: './version.component.html',
    styleUrls: ['./version.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent implements OnInit {
    public newVersionAvailable$: Observable<boolean>;

    constructor(private infoService: AppInfoService, private swUpdate: SwUpdate) {}

    public get version(): string {
        return this.infoService.production ? `v${this.infoService.version}` : 'develop';
    }

    public ngOnInit(): void {
        this.newVersionAvailable$ = this.swUpdate.available.pipe(mapTo(true), startWith(false));
        this.showInfo();
    }

    private showInfo() {
        if (this.infoService.production) {
            const branch = this.infoService.branch;
            const commit = this.infoService.commit;

            console.log(`HAR Viewer ${this.version} (${branch} ${commit})`);
        }
    }
}
