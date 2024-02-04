import { Unsafe } from '../types/unsafe';

export function truncate(text: Unsafe<string>, limit: number, padding = '...'): string {
    if (text == null) {
        return '';
    }

    return text.length > limit ? `${text.substring(0, limit - padding.length)}${padding}` : text;
}
