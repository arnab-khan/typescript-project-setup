import { deleteCard, getCards } from '../../../util/apis';
import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import { renderRouter } from '../../app.router';
import { Cards, Card } from '../../interfaces/cards';
import template from './card-list.component.html';
import './card-list.component.scss';

export class AppCardListComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-card-list', template);
        this.getCardsFromApi();
    }

    getCardsFromApi() {
        getCards().then((response: Cards | undefined) => {
            console.log('card-list', response);
            if (response) {
                const cardList = Object.entries(response).map(element => {
                    return Object.assign(element[1], { id: element[0] })
                }).reverse();
                // console.log('cardList', cardList);
                this.addCards(cardList);
            }
            this.hideLoader();
        })
    }

    addCards(cards: Card[]) {
        const cardListElement = document.getElementById('card-list');
        if (cardListElement) {
            const placeholderImageSrc = (document.getElementById('placeholder-image') as HTMLImageElement)?.src;
            const editSrc = (document.getElementById('edit') as HTMLImageElement)?.src;
            const deleteSrc = (document.getElementById('delete') as HTMLImageElement)?.src;
            const htmlCardsContent = cards.map(card => `
                <li class="mt-5 card-item">
                    <div class="bg-white rounded-2 overflow-hidden shadow h-100 d-flex flex-column">
                        <div class="position-relative image-wrap">
                            <img src="${card?.imageLink || placeholderImageSrc}" alt="${card?.title} "class="w-100 h-100 top-0 start-0 object-fit-cover position-absolute">
                        </div>
                        <div class="p-3 d-flex flex-column flex-grow-1">
                            <div class="flex-grow-1">
                                <h2>${card?.title}</h2>
                                <p class="mt-2 description">${card?.description}</p>
                            </div>
                            <div class="mt-3 d-flex align-items-center justify-content-between">
                                <button data-route="card-detail" data-id="${encodeURIComponent(card?.id || '-')}" class="rounded-2 px-2 py-1 d-block router-element explore-button">Explore</button>
                                <div class="d-flex align-items-center">
                                    <button type="button" data-route="edit-card" data-id="${encodeURIComponent(card?.id || '-')}" class="router-element">
                                        <img src="${editSrc}" alt="edit">
                                    </button>
                                    <button type="button" delete-id="${card?.id}">
                                        <img src="${deleteSrc}" alt="delete" class="ms-2">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            `).join('');
            cardListElement.innerHTML = htmlCardsContent;
            renderRouter();
            this.addDeleteFunction(cardListElement);
        }
    }

    addDeleteFunction(cardListElement: HTMLElement) {
        cardListElement.querySelectorAll('.card-item').forEach(card => {
            const button=card.querySelector('[delete-id]');
            if (button) {
                button.addEventListener('click', this.deleteCardByApi.bind(this, button, card));
            }
        });
    }

    deleteCardByApi(buttonElement: Element, cardElement:Element) {
        const cardId = buttonElement.getAttribute('delete-id');
        if (cardId) {
            deleteCard(cardId).then(response => {
                console.log('delete card', response);
                cardElement?.classList?.add('d-none');
            });
        }
    }

    hideLoader() {
        const loaderElement = document.querySelector('.card-list-section .main-loader');
        loaderElement?.classList?.add('d-none');
    }
}  