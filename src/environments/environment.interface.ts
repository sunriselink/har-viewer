import { InjectionToken } from '@angular/core';

export const APP_ENVIRONMENT_TOKEN = new InjectionToken<IEnvironment>('APP_ENVIRONMENT');

export interface IEnvironment {
    production: boolean;
    version: string;
    commit: string;
    branch: string;
}
