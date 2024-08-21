export function isEmptyDict(dictionary: Record<string, any>): boolean {
    return Object.keys(dictionary).length === 0;
}