import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { APP_ENVIRONMENT_TOKEN } from '../environments/environment.interface';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: APP_ENVIRONMENT_TOKEN,
            useValue: environment,
        },
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerImmediately',
        }),
    ],
};
