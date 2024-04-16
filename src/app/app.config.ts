import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { APP_ENVIRONMENT_TOKEN } from '../environments/environment.interface';
import { FileHandlerComponent } from './pages/file-handler/file-handler.component';
import { HarPageComponent } from './pages/har-page/har-page.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HarPageComponent,
    },
    {
        path: 'file_handler',
        component: FileHandlerComponent,
    },
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
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
