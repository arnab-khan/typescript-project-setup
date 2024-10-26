import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './home.component.html';
import './home.component.scss';

export class AppHomeComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-home', template);
    }
}  