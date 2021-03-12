import { Inject, Injectable } from '@angular/core';
import { APP_VARS_TOKEN } from '../../app-vars';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppInfoService {
    constructor(@Inject(APP_VARS_TOKEN) private appVars: Map<string, string>) {}

    public get production(): boolean {
        return environment.production;
    }

    public get version(): string {
        return this.getValue('APP_VERSION');
    }

    public get commit(): string {
        return this.getValue('GIT_COMMIT_HASH');
    }

    public get branch(): string {
        return this.getValue('GIT_BRANCH');
    }

    private getValue(variable: string): string {
        const value: string = this.appVars.get(variable);
        return value === `{{ ${variable} }}` ? '' : value;
    }
}
