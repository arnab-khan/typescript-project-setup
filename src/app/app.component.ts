import template from './app.component.html';
import './app.component.scss';

export class AppComponent {
    render(): void {
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.innerHTML = template;
        }
    }
}  