import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './footer.component.html';
import './footer.component.scss';

export class AppFooterComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-footer', template);
    }
}  