import { getCard } from '../../../util/apis';
import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import template from './card-list.component.html';
import './card-list.component.scss';

export class AppCardListComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-card-list', template);
        getCard()
            .then(card => {
                console.log(card); // Handle the resolved value here
            })

    }

}  