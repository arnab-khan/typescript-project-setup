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
        const editButton = document.querySelector('.card-detail-section #edit');
        if (editButton) {
            editButton.addEventListener('click', this.editCard.bind(this));
        }
        const deleteButton = document.querySelector('.card-detail-section #delete');
        if (deleteButton) {
            deleteButton.addEventListener('click', this.deleteCardByApi.bind(this));
        }
    }

    getCardFromApi() {
        this.cardId = getRouterInformation()[1];
        getCard(this.cardId).then((response: Card | undefined) => {
            if (response) {
                console.log('card', response);
                this.addValue(response);
                this.hideLoader();
            } else {
                navigateTo('page-not-found', null);
            }
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

    editCard() {
        navigateTo('edit-card', this.cardId);
    }

    deleteCardByApi() {
        if (this.cardId) {
            this.startDeleteButtonLoader();
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

    startDeleteButtonLoader() {
        const sectionElement = document.querySelector('.card-detail-section');
        const deleteButtonElement = document.querySelector('.card-detail-section #delete button');
        const deleteSpinnerElement = document.querySelector('.card-detail-section #delete #delete-btn-spinner');
        sectionElement?.classList?.add('pointer-events-none');
        deleteSpinnerElement?.classList?.remove('d-none');
        deleteButtonElement?.classList?.add('invisible');
    }
}