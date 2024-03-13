import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IHAR } from '../types/har-log';
import { BlobService } from './blob.service';

@Injectable({
    providedIn: 'root',
})
export class HarReaderService {
    private readonly blobService = inject(BlobService);

    public readHAR(file: File): Observable<IHAR> {
        return this.blobService.readContent(file).pipe(map((content: string) => JSON.parse(content) as IHAR));
    }
}
