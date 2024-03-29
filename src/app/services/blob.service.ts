import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BlobService {
    public readContent(blob: Blob): Observable<string> {
        return new Observable<string>((subscriber: Subscriber<string>) => {
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>) => {
                subscriber.next(event.target?.result as string);
                subscriber.complete();
            };

            reader.onerror = (event: ProgressEvent<FileReader>) => {
                subscriber.error(event);
            };

            reader.readAsText(blob);

            return {
                unsubscribe() {
                    if (reader.readyState !== reader.DONE) {
                        reader.abort();
                    }
                },
            };
        });
    }
}
