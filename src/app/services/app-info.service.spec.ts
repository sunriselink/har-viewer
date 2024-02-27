import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_ENVIRONMENT_TOKEN, IEnvironment } from '../../environments/environment.interface';
import { AppInfoService } from './app-info.service';

describe('Service: AppInfoService', () => {
    it('should return filled variables', () => {
        configureModule({
            production: true,
            version: '0.0.0',
            commit: 'd8cfac1b-b3ea-4d17-b8fa-4cb9beb85020',
            branch: 'master',
        });

        runTest({
            production: true,
            version: '0.0.0',
            commit: 'd8cfac1b-b3ea-4d17-b8fa-4cb9beb85020',
            branch: 'master',
        });
    });
});

function configureModule(env: IEnvironment): void {
    TestBed.configureTestingModule({
        providers: [
            {
                provide: APP_ENVIRONMENT_TOKEN,
                useValue: env,
            },
        ] as Provider[],
    });
}

function runTest(env: IEnvironment): void {
    const service = TestBed.inject(AppInfoService);
    expect(service.production).toBe(env.production);
    expect(service.version).toBe(env.version);
    expect(service.commit).toBe(env.commit);
    expect(service.branch).toBe(env.branch);
}
