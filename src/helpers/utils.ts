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

export function decodeBase64Url(base64Url: string): string {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding > 0) {
      base64 += '='.repeat(4 - padding);
    }
    return decodeURIComponent(escape(window.atob(base64)));
  }

export function extractTextFromHtml(htmlString: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const styleTags = tempElement.getElementsByTagName('style');
    while (styleTags.length > 0) {
      styleTags[0].parentNode?.removeChild(styleTags[0]);
    }
    const elementsWithStyle = tempElement.querySelectorAll('*[style]');
    elementsWithStyle.forEach(element => {
      element.removeAttribute('style');
    });
    const plainText = tempElement.textContent || '';
  
    return plainText.trim().replace(/\s+/g, ' '); 
  }