import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_VARS_TOKEN } from '../../app-vars';
import { AppInfoService } from './app-info.service';

describe('Service: AppInfoService', () => {
    it('should return empty strings', () => {
        const APP_VARS = new Map<string, string>([
            ['APP_VERSION', '{{ APP_VERSION }}'],
            ['GIT_COMMIT_HASH', '{{ GIT_COMMIT_HASH }}'],
            ['GIT_BRANCH', '{{ GIT_BRANCH }}'],
        ]);

        configureModule(APP_VARS);

        runTest({
            version: '',
            commit: '',
            branch: '',
        });
    });

    it('should return filled variables', () => {
        const APP_VARS = new Map<string, string>([
            ['APP_VERSION', '0.0.0'],
            ['GIT_COMMIT_HASH', 'd8cfac1b-b3ea-4d17-b8fa-4cb9beb85020'],
            ['GIT_BRANCH', 'master'],
        ]);

        configureModule(APP_VARS);

        runTest({
            version: '0.0.0',
            commit: 'd8cfac1b-b3ea-4d17-b8fa-4cb9beb85020',
            branch: 'master',
        });
    });
});

function configureModule(vars: Map<string, string>) {
    TestBed.configureTestingModule({
        providers: [
            {
                provide: APP_VARS_TOKEN,
                useValue: vars,
            },
        ] as Provider[],
    });
}

function runTest(results: { version: string; commit: string; branch: string }): void {
    const service = TestBed.inject(AppInfoService);
    expect(service.version).toBe(results.version);
    expect(service.commit).toBe(results.commit);
    expect(service.branch).toBe(results.branch);
}
