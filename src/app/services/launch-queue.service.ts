import { Injectable } from '@angular/core';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LaunchQueueService {
    private readonly file$ = new ReplaySubject<File>(1);

    private hasConsumer = false;

    public tryCreateConsumer(): void {
        if (!this.isSupported()) {
            console.warn('LaunchQueue is not supported');
            return;
        }

        this.createConsumer();
    }

    public handleFile(): Observable<File> {
        return this.hasConsumer ? this.file$.asObservable() : EMPTY;
    }

    private isSupported(): boolean {
        return !!window.launchQueue;
    }

    private createConsumer(): void {
        this.hasConsumer = true;

        window.launchQueue.setConsumer(async params => {
            if (params.files?.length) {
                const file = await params.files[0].getFile();

                this.file$.next(file);
                this.file$.complete();
            }
        });
    }
}

declare global {
    interface Window {
        launchQueue: {
            setConsumer: (consumer: (params: LaunchParams) => void) => void;
        };
    }
    interface LaunchParams {
        readonly files?: FileSystemFileHandle[];
    }
}
