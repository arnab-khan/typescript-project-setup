export function addTemplateToElementBasedOnId(elementId: string, template: string): void {// This function has used to add html 'template' as 'innerHTML' inside a element have id 'elementId'
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.innerHTML = template;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}

export function getRouterInformation(): [string, string] { // This function has used to get router path and 'id' params in form of an array
    const hash = window.location.hash.replace('#', '');
    const [router, query] = hash.split('?');
    let params;
    if (query) {
        params = new URLSearchParams(query);
    }
    const id = decodeURIComponent(params?.get('id') || '');
    return [router, id];
}