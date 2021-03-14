export function truncate(text: string, limit: number, padding = '...'): string {
    return text?.length > limit ? `${text.substring(0, limit - padding.length)}${padding}` : text;
}
