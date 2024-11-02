import { getCard } from '../../../util/apis';
import { addTemplateToElementBasedOnId, getRouterInformation } from '../../../util/render.util';
import { Card } from '../../interfaces/cards';
import template from './card-detail.component.html';
import './card-detail.component.scss';

export class AppCardDetailComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-card-detail', template);
        this.getCardFromApi();
    }

    getCardFromApi() {
        const id = getRouterInformation()[1];
        getCard(id).then((response: Card | undefined) => {
            console.log('card', response);
            this.addValue(response);
        })
    }

    addValue(card: Card | undefined) {
        const imageElement = document.getElementById('image') as HTMLImageElement;
        const imageLink = card?.imageLink;
        if (imageElement && imageLink) {
            imageElement.src = imageLink;
        }
        const titleElement = document.getElementById('title');
        if (titleElement) {
            titleElement.innerText = card?.title || '';
        }
        const descriptionElement = document.getElementById('description');
        if (descriptionElement) {
            descriptionElement.innerText = card?.description || '';
        }
    }
}  