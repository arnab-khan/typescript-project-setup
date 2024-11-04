import { deleteCard, getCard } from '../../../util/apis';
import { addTemplateToElementBasedOnId, getRouterInformation } from '../../../util/render.util';
import { navigateTo } from '../../app.router';
import { Card } from '../../interfaces/cards';
import template from './card-detail.component.html';
import './card-detail.component.scss';

export class AppCardDetailComponent {
    cardId: string | undefined;

    render(): void {
        addTemplateToElementBasedOnId('app-card-detail', template);
        this.addEventListeners();
        this.getCardFromApi();
    }

    addEventListeners(): void {
        const deleteButton = document.querySelector('.card-detail-section .delete');
        if (deleteButton) {
            deleteButton.addEventListener('click', this.deleteCardByApi.bind(this));
        }
    }

    getCardFromApi() {
        this.cardId = getRouterInformation()[1];
        getCard(this.cardId).then((response: Card | undefined) => {
            console.log('card', response);
            this.addValue(response);
            this.hideLoader();
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

    deleteCardByApi() {
        if (this.cardId) {
            deleteCard(this.cardId).then(() => {
                navigateTo('card-list', null);
            });
        }
    }

    hideLoader() {
        const loaderElement = document.querySelector('.card-detail-section .main-loader');
        const contentElement = document.querySelector('.card-detail-section .content');
        loaderElement?.classList?.add('d-none');
        contentElement?.classList?.remove('d-none');
    }
}