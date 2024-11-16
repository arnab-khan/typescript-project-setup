import { deleteCard, getCards } from '../../../util/apis';
import { addTemplateToElementBasedOnId } from '../../../util/render.util';
import { navigateTo, renderRouter } from '../../app.router';
import { Cards, Card } from '../../interfaces/cards';
import template from './card-list.component.html'; // 'template' contain html of this component. Setup done at declarations.d.ts file
import './card-list.component.scss'; // This line imports the SCSS file of this component for processing by the Webpack. The processed CSS is automatically injected into the page when the app runs. Setup done at declarations.d.ts file

export class AppCardListComponent {

    noOfCard = 0;

    render(): void { // This function will call during router change at 'app.module.ts' file to load 'template' and will also call 'this.getCardsFromApi()'
        addTemplateToElementBasedOnId('app-card-list', template); // 'template' has 'html' code of this component
        this.getCardsFromApi();
    }

    getCardsFromApi() {
        getCards().then((response: Cards | undefined) => { // getting cards by api
            console.log('card-list', response);
            if (response) {
                const cardList = Object.entries(response)?.map(element => {
                    return Object.assign(element[1], { id: element[0] })
                }).reverse();
                // console.log('cardList', cardList);
                this.noOfCard = cardList?.length || 0;
                if (this.noOfCard) {
                    this.addCards(cardList);
                } else {
                    this.noCard();
                }
            } else {
                this.noCard();
            }
            this.hideLoader();
        })
    }

    addCards(cards: Card[]) { // This function has used to add cards details inside html
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
                                <h2 class="title">${card?.title}</h2>
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
            renderRouter(); // refresh router because here inside card has used router attribute (data-id)
            this.addDeleteFunction(cardListElement);
        }
    }

    addDeleteFunction(cardListElement: HTMLElement) { // Added a delete function at delete button for each card.
        cardListElement.querySelectorAll('.card-item').forEach(card => {
            const button = card.querySelector('[delete-id]');
            if (button) {
                button.addEventListener('click', this.deleteCardByApi.bind(this, button, card));
            }
        });
    }

    deleteCardByApi(buttonElement: Element, cardElement: Element) { // On click a delete card api will call
        const cardId = buttonElement.getAttribute('delete-id');
        if (cardId) {
            cardElement?.classList?.add('d-none');
            this.noOfCard--;
            if (!this.noOfCard) {
                this.noCard();
            }
            deleteCard(cardId); // calling delete card api
        }
    }

    noCard() { // Has used to show empty state, that is if no card present.
        const noCardElement = document.querySelector('.card-list-section #no-card');
        if (noCardElement) {
            noCardElement?.classList?.remove('d-none');
            const buttonElement = noCardElement.querySelector('button'); // Inside empty state element a create card button present.
            if (buttonElement) {
                buttonElement.addEventListener('click', function () { // Added a function to create button on click will navigate to 'create-card' router
                    navigateTo('create-card', null);
                });
            }
        }
    }

    hideLoader() { // When initially load page a loader present. After call this function loader will hide
        const loaderElement = document.querySelector('.card-list-section .main-loader');
        loaderElement?.classList?.add('d-none');
    }
}  