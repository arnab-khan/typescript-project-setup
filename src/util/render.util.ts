export function addTemplateToElementBasedOnId(elementId: string, template: string): void {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.innerHTML = template;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}