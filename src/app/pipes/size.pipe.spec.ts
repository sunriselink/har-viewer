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

    it('should convert value to KB and MB', () => {
        const kb = 1024;
        const mb = kb * 1024;
        const gb = mb * 1024;
        const tb = gb * 1024;

        expect(pipe.transform(kb - 1)).toBe('1023 B');
        expect(pipe.transform(kb)).toBe('1 KB');
        expect(pipe.transform(mb)).toBe('1 MB');
        expect(pipe.transform(gb)).toBe('1024 MB');
        expect(pipe.transform(tb)).toBe('1048576 MB');
    });

    it('should return two decimal places (excluding zeros)', () => {
        expect(pipe.transform(1234)).toBe('1.21 KB');
        expect(pipe.transform(1054)).toBe('1.03 KB');
        expect(pipe.transform(1124)).toBe('1.1 KB');
        expect(pipe.transform(1024)).toBe('1 KB');
    });
});
