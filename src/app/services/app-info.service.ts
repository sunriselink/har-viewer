import { Injectable } from '@angular/core';
import { APP_INFO } from '../../app-info';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppInfoService {
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
        const value: string = APP_INFO.get(variable);
        return value === `{{ ${variable} }}` ? '' : value;
    }
}
