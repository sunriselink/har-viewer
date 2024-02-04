import { inject, Injectable } from '@angular/core';
import { APP_ENVIRONMENT_TOKEN } from '../../environments/environment.interface';

@Injectable({
    providedIn: 'root',
})
export class AppInfoService {
    private readonly env = inject(APP_ENVIRONMENT_TOKEN);

    public get production(): boolean {
        return this.env.production;
    }

    public get version(): string {
        return this.env.version;
    }

    public get commit(): string {
        return this.env.commit;
    }

    public get branch(): string {
        return this.env.branch;
    }
}
