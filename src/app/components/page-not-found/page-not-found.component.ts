import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './page-not-found.component.html';
import './page-not-found.component.scss';

export class AppPageNotFoundComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-page-not-found', template);
    }
}  