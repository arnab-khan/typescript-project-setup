import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './card-detail.component.html';
import './card-detail.component.scss';

export class AppCardDetailComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-card-detail', template);
    }
}  