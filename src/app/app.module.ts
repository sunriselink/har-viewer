import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { APP_ENVIRONMENT_TOKEN } from '../environments/environment.interface';
import { AppComponent } from './app.component';
import { ExpansionPanelContentComponent } from './components/expansion-panel-content/expansion-panel-content.component';
import { ExpansionPanelHeaderComponent } from './components/expansion-panel-header/expansion-panel-header.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { HarContentComponent } from './components/har-content/har-content.component';
import { HarEntryComponent } from './components/har-entry/har-entry.component';
import { HarRequestDataComponent } from './components/har-request-data/har-request-data.component';
import { HarViewerComponent } from './components/har-viewer/har-viewer.component';
import { JsonViewerComponent } from './components/json-viewer/json-viewer.component';
import { ModalComponent } from './components/modal/modal.component';
import { TagComponent } from './components/tag/tag.component';
import { VersionComponent } from './components/version/version.component';
import { FileDropZoneDirective } from './directives/file-drop-zone.directive';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerImmediately',
        }),
    ],
    declarations: [
        AppComponent,
        HarViewerComponent,
        HarEntryComponent,
        ExpansionPanelComponent,
        ExpansionPanelHeaderComponent,
        ExpansionPanelContentComponent,
        TagComponent,
        FileUploaderComponent,
        HarContentComponent,
        VersionComponent,
        HarRequestDataComponent,
        FileDropZoneDirective,
        JsonViewerComponent,
        ModalComponent,
    ],
    providers: [
        {
            provide: APP_ENVIRONMENT_TOKEN,
            useValue: environment,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
