import { TestBed } from '@angular/core/testing';
import { BlobService } from './blob.service';

describe('BlobService', () => {
    let service: BlobService;

    beforeEach(() => {
        service = TestBed.inject(BlobService);
    });

    it('should return BLOB content', done => {
        const blob = new Blob(['Hello, World!']);
        let result: string;

        service.readContent(blob).subscribe({
            next: value => (result = value),
            complete: () => {
                expect(result).toBe('Hello, World!');
                done();
            },
        });
    });
});
