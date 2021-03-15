import { Inject, Injectable } from '@angular/core';
import { APP_ENVIRONMENT_TOKEN, IEnvironment } from '../../environments/environment.interface';

@Injectable({ providedIn: 'root' })
export class AppInfoService {
    constructor(@Inject(APP_ENVIRONMENT_TOKEN) private env: IEnvironment) {}

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
