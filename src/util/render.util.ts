export function addTemplateToElementBasedOnId(elementId: string, template: string): void {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.innerHTML = template;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}

export function getRouterInformation() {
    const hash = window.location.hash.replace('#', '');
    const [router, query] = hash.split('?');
    let params;
    if (query) {
        params = new URLSearchParams(query);
    }
    const id = decodeURIComponent(params?.get('id') || '');
    return [router, id];
}