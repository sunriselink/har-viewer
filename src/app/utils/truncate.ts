export function truncate(text: string, limit, padding: string = '...'): string {
    return text?.length > limit ? `${text.substring(0, limit - padding.length)}${padding}` : text;
}
