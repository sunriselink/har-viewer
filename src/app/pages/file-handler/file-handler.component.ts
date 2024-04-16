import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaunchQueueService } from '../../services/launch-queue.service';

@Component({
    selector: 'app-file-handler',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileHandlerComponent implements OnInit {
    private readonly launchQueueService = inject(LaunchQueueService);
    private readonly router = inject(Router);

    public ngOnInit(): void {
        this.launchQueueService.tryCreateConsumer();
        this.router.navigateByUrl('/', { replaceUrl: true });
    }
}
