import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';
import { map } from 'rxjs';
import { AppInfoService } from '../../services/app-info.service';

@Component({
    selector: 'app-version',
    standalone: true,
    templateUrl: './version.component.html',
    styleUrl: './version.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent implements OnInit {
    protected readonly newVersionAvailable: Signal<boolean>;

    private readonly infoService = inject(AppInfoService);
    private readonly swUpdate = inject(SwUpdate);

    constructor() {
        this.newVersionAvailable = this.getNewVersionAvailable();
    }

    public ngOnInit(): void {
        this.showInfo();
    }

    protected get version(): string {
        return this.infoService.version ? `v${this.infoService.version}` : 'develop';
    }

    private getNewVersionAvailable(): Signal<boolean> {
        const stream$ = this.swUpdate.versionUpdates.pipe(map(event => event.type === 'VERSION_READY'));
        return toSignal(stream$, { initialValue: false });
    }

    private showInfo(): void {
        if (this.infoService.version) {
            console.log(`HAR Viewer ${this.version} (${this.infoService.commit})`);
        }
    }
}
