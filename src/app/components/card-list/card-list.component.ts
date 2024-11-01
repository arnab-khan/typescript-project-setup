import { getCards } from '../../../util/apis';
import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import { Cards, Card } from '../../interfaces/cards';
import template from './card-list.component.html';
import './card-list.component.scss';

export class AppCardListComponent {
    render(): void {
        addTemplateToElementBasedOnId('app-card-list', template);
        this.getCardsFromApi();
    }

    getCardsFromApi() {
        getCards().then((response: Cards) => {
            console.log('card-list', response);
            const cardList = Object.entries(response).map(element => {
                return Object.assign(element[1], { id: element[0] })
            }).reverse();
            console.log('cardList', cardList);
            this.addCards(cardList);
        })
    }

    addCards(cards: Card[]) {
        const cardListElement = document.getElementById('card-list');
        if (cardListElement) {
            const placeholderSrc = (document.getElementById('placeholder-image') as HTMLImageElement)?.src;
            const htmlCardsContent = cards.map(card => `
                <li class="mt-5">
                    <div class="bg-white rounded-2 overflow-hidden shadow h-100 d-flex flex-column">
                        <div class="position-relative image-wrap">
                            <img src="${card.imageLink || placeholderSrc}" alt="${card.title} "class="w-100 h-100 top-0 start-0 object-fit-cover position-absolute">
                        </div>
                        <div class="p-2 d-flex flex-column flex-grow-1">
                            <div class="flex-grow-1">
                                <h2>${card.title}</h2>
                                <p class="mt-2 description">${card.description}</p>
                            </div>
                            <div class="mt-3">
                                <button data-route="${card.id}" class="rounded-2 px-2 py-1 d-block explore-button">Explore</button>
                            </div>
                        </div>
                    </div>
                </li>
            `).join('');
            cardListElement.innerHTML = htmlCardsContent;
        }
    }
}  