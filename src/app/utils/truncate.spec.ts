import { truncate } from './truncate';

describe('Utils: truncate', () => {
    it('should return original value when falsely', () => {
        expect(truncate(null, 0)).toBeNull();
        expect(truncate(void 0, 0)).toBeUndefined();
    });

    it('should return original value when less limit', () => {
        expect(truncate('Some text', 50)).toBe('Some text');
    });

    it('should return limited text', () => {
        expect(truncate('Some text', 7)).toBe('Some...');
    });

    it('should return limited text with custom padding', () => {
        expect(truncate('Some text', 7, '____')).toBe('Som____');
    });
});
