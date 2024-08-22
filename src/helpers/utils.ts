export function isEmptyDict(dictionary: Record<string, string>): boolean {
    return Object.keys(dictionary).length === 0;
}

export function isChromeExtension() {
    return window.chrome && chrome.runtime && chrome.runtime.id;
};

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0'); // Pad single-digit days with a leading zero
    return `${year}/${month}/${day}`;
};