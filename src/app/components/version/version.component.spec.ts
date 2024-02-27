import { TestBed } from '@angular/core/testing';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { of } from 'rxjs';
import { first, skip } from 'rxjs/operators';
import { APP_ENVIRONMENT_TOKEN, IEnvironment } from '../../../environments/environment.interface';
import { VersionComponent } from './version.component';

describe('Component: VersionComponent', () => {
    it('should print "develop" version when dev environment', () => {
        configureTestingModule({ production: false });

        const fixture = TestBed.createComponent(VersionComponent);
        const component = fixture.componentInstance;

        expect(component.version).toBe('develop');
    });

    it('should return app version when prod environment', () => {
        configureTestingModule({
            production: true,
            version: '1.0.0',
        });

        const fixture = TestBed.createComponent(VersionComponent);
        const component = fixture.componentInstance;

        expect(component.version).toBe('v1.0.0');
    });

    it('should indicate new version when SwUpdate emit available', done => {
        configureTestingModule({ production: false });

        const fixture = TestBed.createComponent(VersionComponent);
        const component = fixture.componentInstance;

        fixture.detectChanges();

        let firstFalse = false;

        component.newVersionAvailable$.pipe(first()).subscribe(value => (firstFalse = !value));
        component.newVersionAvailable$.pipe(skip(1)).subscribe(value => {
            expect(value).toBeTrue();
            expect(firstFalse).toBeTrue();
            done();
        });
    });
});

function configureTestingModule(env: Partial<IEnvironment>): void {
    TestBed.configureTestingModule({
        providers: [
            VersionComponent,
            {
                provide: APP_ENVIRONMENT_TOKEN,
                useValue: env,
            },
            {
                provide: SwUpdate,
                useValue: jasmine.createSpyObj<SwUpdate>([], {
                    versionUpdates: of({ type: 'VERSION_READY' } as VersionReadyEvent),
                }),
            },
        ],
    });
}
