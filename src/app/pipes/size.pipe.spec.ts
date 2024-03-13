import { SizePipe } from './size.pipe';

describe('Pipe: Size', () => {
    let pipe: SizePipe;

    beforeEach(() => {
        pipe = new SizePipe();
    });

    it('should return "0 B" when falsy value', () => {
        expect(pipe.transform(void 0)).toBe('0 B');
        expect(pipe.transform(null)).toBe('0 B');
        expect(pipe.transform(0)).toBe('0 B');
    });

    it('should not convert when negative value', () => {
        expect(pipe.transform(-1000000)).toBe('-1000000 B');
    });

    it('should convert value to other units', () => {
        const kb = 1000;
        const mb = kb * 1000;
        const gb = mb * 1000;
        const tb = gb * 1000;
        const pb = tb * 1000;

        expect(pipe.transform(kb - 1)).toBe('999 B');
        expect(pipe.transform(kb)).toBe('1 kB');
        expect(pipe.transform(mb)).toBe('1 MB');
        expect(pipe.transform(gb)).toBe('1 GB');
        expect(pipe.transform(tb)).toBe('1000 GB');
        expect(pipe.transform(pb)).toBe('1000000 GB');
    });

    it('should return two decimal places (excluding zeros)', () => {
        expect(pipe.transform(1210)).toBe('1.21 kB');
        expect(pipe.transform(1030)).toBe('1.03 kB');
        expect(pipe.transform(1100)).toBe('1.1 kB');
        expect(pipe.transform(1000)).toBe('1 kB');
    });
});
