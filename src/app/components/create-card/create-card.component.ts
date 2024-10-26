import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './create-card.component.html';
import './create-card.component.scss';

export class AppCreateCardComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-create-card', template);
    }
}  