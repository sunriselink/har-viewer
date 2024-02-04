import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { filter, map, Observable, startWith } from 'rxjs';
import { AppInfoService } from '../../services/app-info.service';

@Component({
    selector: 'app-version',
    standalone: true,
    templateUrl: './version.component.html',
    styleUrl: './version.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, NgIf],
})
export class VersionComponent implements OnInit {
    public readonly newVersionAvailable$: Observable<boolean>;

    private readonly infoService = inject(AppInfoService);
    private readonly swUpdate = inject(SwUpdate);

    constructor() {
        this.newVersionAvailable$ = this.swUpdate.versionUpdates.pipe(
            filter(event => event.type === 'VERSION_READY'),
            map(() => true),
            startWith(false),
        );
    }

    public get version(): string {
        return this.infoService.production ? `v${this.infoService.version}` : 'develop';
    }

    public ngOnInit(): void {
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
