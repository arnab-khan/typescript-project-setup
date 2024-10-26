import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import { navigateTo } from '../../app.router';
import template from './header.component.html';
import './header.component.scss';

export class AppHeaderComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-header', template);
    }
    navigateTo(path: string): void {
       navigateTo(path)
    }
}  