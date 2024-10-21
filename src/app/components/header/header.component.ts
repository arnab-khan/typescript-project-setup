import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './header.component.html';
import './header.component.scss';

export class AppHeaderComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-header', template);
    }
}  