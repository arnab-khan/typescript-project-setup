import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './main.component.html';
import './main.component.scss';

export class AppMainComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-main', template);
    }
}  