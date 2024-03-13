import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { BlobService } from './blob.service';

describe('BlobService', () => {
    let service: BlobService;

    beforeEach(() => {
        service = TestBed.inject(BlobService);
    });

    it('should return BLOB content', async () => {
        const blob = new Blob(['Hello, World!']);
        const stream$ = service.readContent(blob);

        const result = await lastValueFrom(stream$);

        expect(result).toBe('Hello, World!');
    });
});
