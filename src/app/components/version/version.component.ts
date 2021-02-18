import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppInfoService } from '../../services/app-info.service';

@Component({
    selector: 'app-version',
    templateUrl: './version.component.html',
    styleUrls: ['./version.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent implements OnInit {
    constructor(private infoService: AppInfoService) {}

    public get version(): string {
        return this.infoService.production ? `v${this.infoService.version}` : 'v0.0.0';
    }

    public ngOnInit(): void {
        if (this.infoService.production) {
            const branch = this.infoService.branch;
            const commit = this.infoService.commit;

            console.log(`HarViewer ${this.version} (${branch} ${commit})`);
        }
    }
}
