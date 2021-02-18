import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { AppComponent } from './app.component';
import { ExpansionPanelContentComponent } from './components/expansion-panel-content/expansion-panel-content.component';
import { ExpansionPanelHeaderComponent } from './components/expansion-panel-header/expansion-panel-header.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { HarContentComponent } from './components/har-content/har-content.component';
import { HarEntryComponent } from './components/har-entry/har-entry.component';
import { HarViewerComponent } from './components/har-viewer/har-viewer.component';
import { TagComponent } from './components/tag/tag.component';
import { VersionComponent } from './components/version/version.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, NgxJsonViewerModule],
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
