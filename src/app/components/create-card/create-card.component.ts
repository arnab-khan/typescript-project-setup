import { editCard, getCard, postCard } from '../../../util/apis';
import { addTemplateToElementBasedOnId, getRouterInformation } from '../../../util/render.util';
import { navigateTo } from '../../app.router';
import { Card } from '../../interfaces/cards';
import template from './create-card.component.html';
import './create-card.component.scss';

export class AppCreateCardComponent {
    cardId = '';
    apiBody: { [x: string]: string } = {};
    submitButton: HTMLElement | null | undefined;
    form: HTMLElement | null | undefined;
    imagePattern = /^(https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|tif)(\?.*)?)$/i;

    render(): void {
        addTemplateToElementBasedOnId('app-create-card', template);
        this.addEventListeners();
        this.getCardFromApi();
    }

    getCardFromApi() {
        this.cardId = getRouterInformation()[1];
        getCard(this.cardId).then((response: Card | undefined) => {
            console.log('card', response);
            this.patchValue(response);
        })
    }

    patchValue(card: Card | undefined) {
        const title = (document.querySelector('[name="title"]') as HTMLInputElement);
        const description = (document.querySelector('[name="description"]') as HTMLInputElement);
        const imageLink = (document.querySelector('[name="imageLink"]') as HTMLInputElement);
        if (title) {
            title.value = card?.title || '';
        }
        if (description) {
            description.value = card?.description || '';
        }
        if (imageLink) {
            imageLink.value = card?.imageLink || '';
        }
    }

    addEventListeners(): void {
        this.submitButton = document.getElementById('submit-btn');
        if (this.submitButton) {
            this.submitButton.addEventListener('click', this.submitForm.bind(this)); // 'this' indicating 'class AppCreateCardComponent'. When pass 'this.submitForm' as a callback to the click event listener, the method loses its reference to the original 'AppCreateCardComponent' instance, which makes 'this' in 'submitForm' undefined or refers to the button itself rather than the component instance.
        }
        this.form = document.getElementById('card-form');
        if (this.form) {
            this.form.addEventListener('input', this.changeInput.bind(this));
        }
    }

    submitForm(event: Event): void {
        event.preventDefault();
        this.createApiBody(); // 'this' is comming from 'bind(this)'
        this.form?.classList?.add('form-submitted');
        if (this.allErrorHandle()) {
            const firstInvalidField = this.form?.querySelector('.error');
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // window.alert('Enter all required fields');
        } else {
            this.startLoader();
            let api: Promise<any>;
            if (this.cardId) {
                api = editCard(this.cardId, this.apiBody);
            } else {
                api = postCard(this.apiBody);
            }
            api.then(response => {
                console.log('Added data:', response);
                navigateTo('card-list', null);
            });
        }
    }

    createApiBody() {
        const title = (document.querySelector('[name="title"]') as HTMLInputElement)?.value?.trim();
        const description = (document.querySelector('[name="description"]') as HTMLInputElement)?.value?.trim();
        const imageLink = (document.querySelector('[name="imageLink"]') as HTMLInputElement)?.value?.trim();
        this.apiBody = {
            title: title,
            description: description || '',
            imageLink: imageLink || ''
        }
    }

    changeInput() {
        this.createApiBody();
        this.allErrorHandle();
    }

    allErrorHandle() {
        const titleError = this.errorHandle('title-wrap', 'title');
        const descriptionError = this.errorHandle('description-wrap', 'description');
        const imageLinkError = this.patternErrorHandle('image-link-wrap', 'imageLink', this.imagePattern);
        return titleError || descriptionError || imageLinkError;
    }

    errorHandle(wrapElementId: string, apiBodyKey: string) {
        let hasError = false;
        const wrapElement = document.getElementById(wrapElementId);
        if (wrapElement) {
            if (this.apiBody?.[apiBodyKey]) { // Check if the field have value 
                wrapElement.classList.remove('error'); // add error class
            } else {
                wrapElement.classList.add('error'); // remove error class
                hasError = true;
            }
        }
        return hasError;
    }

    patternErrorHandle(wrapElementId: string, apiBodyKey: string, pattern: RegExp) {
        let hasError = false;
        const inputValue = this.apiBody?.[apiBodyKey];
        const wrapElement = document.getElementById(wrapElementId);
        if (wrapElement) {
            if (!inputValue || pattern.test(inputValue)) { // Check if the field has a value and matches the specified pattern
                wrapElement.classList.remove('error'); // Remove error class if valid
            } else {
                wrapElement.classList.add('error'); // Add error class if invalid
                hasError = true;
            }
        }
        return hasError;
    }


    startLoader() {
        const submitButtonSpinner = document.getElementById('submit-btn-spinner');
        this.submitButton?.classList?.add('invisible');
        submitButtonSpinner?.classList?.remove('d-none');
        this.form?.classList?.add('pointer-events-none')
    }
}  