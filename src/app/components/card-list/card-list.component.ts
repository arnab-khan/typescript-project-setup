import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './card-list.component.html';
import './card-list.component.scss';

export class AppCardListComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-card-list', template);
    }
}  