export function isEmptyDict(dictionary: Record<string, string>): boolean {
    return Object.keys(dictionary).length === 0;
}